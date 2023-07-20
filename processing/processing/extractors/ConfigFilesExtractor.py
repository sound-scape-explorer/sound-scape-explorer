from pathlib import Path
from typing import Iterable, List, Tuple

import torch
import torchaudio
from torch import Tensor

from processing.common.Timer import Timer
from processing.config.ConfigFile import ConfigFile
from processing.models.AbstractModel import AbstractModel
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


class ConfigFilesExtractor:
    __files: List[ConfigFile]
    __files_length: int
    __timer: Timer
    __expected_sample_rate: int
    __model: AbstractModel
    __base_path: str

    def __init__(
        self,
        files: List[ConfigFile],
        model: AbstractModel,
        expected_sample_rate: int,
        base_path: str,
    ) -> None:
        self.__files = files
        self.__files_length = len(files)

        if self.__files_length == 0:
            raise ValueError("Unable to find files to extract.")

        self.__timer = Timer(self.__files_length)
        self.__expected_sample_rate = expected_sample_rate
        self.__base_path = base_path

        self.__model = model

        self.__succeed()

    def __succeed(self) -> None:
        print_new_line(True)
        print(f"ConfigFilesExtractor loaded with " f"{self.__model.__class__.__name__}")

    @staticmethod
    def __verify_path_existence(path_string: str) -> None:
        path = Path(path_string)

        if not path.exists():
            raise FileNotFoundError(f"Unable to find file path {path}.")

    def __verify_sample_rates(self, sample_rate: int) -> None:
        if sample_rate != self.__expected_sample_rate:
            raise ValueError(
                f"Unable to validate expected sample rate. Given {sample_rate}."
            )

    @staticmethod
    def __drop_last_second(
        wav: Tensor,
        sample_rate: int,
    ) -> Tensor:
        _, wav_length = wav.shape
        length_sec = wav_length / sample_rate
        complete_sec = int(length_sec)
        complete_samples = complete_sec * sample_rate
        return wav[:, :complete_samples]

    @staticmethod
    def __load_audio(path: str) -> Tuple[Tensor, int]:
        wav, sample_rate = torchaudio.load(path)  # type: ignore

        return wav, sample_rate

    def __enumerate_files(
        self,
    ) -> Iterable[ConfigFile]:
        for file_ in self.__files:
            yield file_

    def yield_features(
        self,
    ) -> Iterable[Tuple[Tensor, ConfigFile]]:
        self.__timer.reset()

        for file_ in self.__enumerate_files():
            path_string = f"{self.__base_path}{file_.name}"

            self.__verify_path_existence(path_string)

            wav, sample_rate = self.__load_audio(path_string)

            self.__verify_sample_rates(sample_rate)

            self.__model.set_sample_rate(sample_rate)

            wav = self.__drop_last_second(wav, sample_rate)
            features = self.__extract_features(wav, sample_rate)

            self.__timer.progress()

            yield features, file_

    def yield_and_store_features(
        self,
        band: str,
        storage: Storage,
    ) -> None:
        # This is used to run files durations only once
        # when user asks for multiple bands.
        should_store_durations = not storage.has_files_durations()

        for file_features, _ in self.yield_features():
            features: List[List[float]] = file_features.tolist()

            storage.append_files_features(
                band=band,
                features=features,
            )

            if should_store_durations is True:
                storage.append_files_durations(features=features)

    def __forward_model(
        self,
        samples: Tensor,
    ) -> Tensor:
        tensor = self.__model.forward(samples)

        if self.__model.device == "cuda":
            return tensor.cpu()

        return tensor

    @staticmethod
    def __flatten_features(
        features: List[Tensor],
    ) -> Tensor:
        return torch.concat(features)

    def __extract_features(
        self,
        wav: Tensor,
        sample_rate: int,
    ) -> Tensor:
        # `batch` acts as the maximum audio duration of 5 minutes.
        batch = sample_rate * 60 * 5
        features: List[Tensor] = []

        i = 0
        while i < wav.shape[1]:
            start = i
            end = i + batch
            samples: Tensor = wav[:, start:end]
            samples_features = self.__forward_model(samples)

            i += batch
            features.append(samples_features)

        flattened_features: Tensor = self.__flatten_features(features)

        return flattened_features
