from pathlib import Path
from typing import Iterable, List, Tuple

import torch
import torchaudio
from torch import Tensor

from processing.config.ConfigFile import ConfigFiles
from processing.models.AbstractModel import AbstractModel
from processing.storage.Storage import Storage
from processing.timers.Timer import Timer
from processing.utils.print_new_line import print_new_line


class ConfigFilesExtractor:
    __files: ConfigFiles
    __files_length: int
    __timer: Timer
    __expected_sample_rate: int
    __model: AbstractModel
    __base_path: str

    def __init__(
        self,
        files: ConfigFiles,
        model: AbstractModel,
        expected_sample_rate: int,
        base_path: str,
    ) -> None:
        self.__files = files
        self.__files_length = len(self.__files.keys())

        if self.__files_length == 0:
            raise ValueError('No files to extract.')

        self.__timer = Timer(self.__files_length)
        self.__expected_sample_rate = expected_sample_rate
        self.__base_path = base_path

        self.__model = model

        self.__succeed()

    def __succeed(self) -> None:
        print_new_line(True)
        print(
            f'ConfigFilesExtractor loaded with '
            f'{self.__model.__class__.__name__}'
        )

    @staticmethod
    def __verify_path_existence(path_string: str) -> None:
        path = Path(path_string)

        if not path.exists():
            raise FileNotFoundError(f'Audio file not found: {path}')

    def __verify_sample_rates(self, sample_rate: int) -> None:
        if sample_rate != self.__expected_sample_rate:
            raise ValueError(
                'Sample rate differs from expected sample rate.'
            )

    # TODO: Prefer drop incomplete last second instead of filling it with zeros.
    # TODO: Add console outputs on drop
    @staticmethod
    def __fill_wav_to_round_duration(
        wav: Tensor,
        sample_rate: int,
    ) -> Tensor:
        rest = wav.shape[1] % sample_rate

        if rest != 0:
            wav = torch.cat((wav, torch.zeros((1, sample_rate - rest))), 1)

        return wav

    @staticmethod
    def __load_audio(path: str) -> Tuple[Tensor, int]:
        wav, sample_rate = torchaudio.load(path)  # type: ignore

        return wav, sample_rate

    def __iterate_files(
        self,
    ) -> Iterable[Tuple[int, str]]:
        for file_index, item in enumerate(self.__files.items()):
            file_name, _ = item
            yield file_index, file_name

    def yield_features(
        self,
    ) -> Iterable[Tuple[Tensor, int]]:
        self.__timer.reset()

        for file_index, file_name in self.__iterate_files():
            path_string = f'{self.__base_path}{file_name}'

            self.__verify_path_existence(path_string)

            wav, sample_rate = self.__load_audio(path_string)

            self.__verify_sample_rates(sample_rate)

            self.__model.set_sample_rate(sample_rate)

            wav = self.__fill_wav_to_round_duration(wav, sample_rate)
            features = self.__extract_features(wav, sample_rate)

            self.__timer.print_timeleft()

            yield features, file_index

    def yield_and_store_features(
        self,
        band: str,
        storage: Storage,
    ) -> None:
        for features, file_index in self.yield_features():
            storage.create_file_features(
                features=features,
                band=band,
                file_index=file_index,
            )

    def __forward_model(
        self,
        samples: Tensor,
    ) -> Tensor:
        tensor = self.__model.forward(samples)

        if self.__model.device == 'cuda':
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
            samples: Tensor = wav[:, i:i + batch]
            samples_features = self.__forward_model(samples)

            i += batch
            features.append(samples_features)

        flattened_features: Tensor = self.__flatten_features(
            features
        )

        return flattened_features
