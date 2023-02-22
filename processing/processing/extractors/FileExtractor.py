from pathlib import Path
from typing import Dict, Iterable, List, Tuple

import torch
import torchaudio
from torch import Tensor

from processing.config.Config import Config
from processing.config.types.ConfigFiles import ConfigFiles
from processing.models.AbstractModel import AbstractModel
from processing.storage.Storage import Storage
from processing.timers.Timer import Timer

Features = Dict[str, List[float]]


class FileExtractor:
    __storage: Storage
    __files: ConfigFiles
    __files_length: int
    __timer: Timer
    __expected_sample_rate: int
    __model: AbstractModel
    __base_path: str

    def __init__(
        self,
        storage: Storage,
        config: Config,
        model: AbstractModel,
        expected_sample_rate: int,
        base_path: str,
    ) -> None:
        self.__config = config
        self.__files = self.__config.get_files()
        self.__files_length = len(self.__files.keys())

        if self.__files_length == 0:
            raise ValueError('No files to extract.')

        self.__storage = storage

        self.__timer = Timer(self.__files_length)
        self.__expected_sample_rate = expected_sample_rate
        self.__base_path = base_path

        print(f'Extractor loaded with model {model.__class__.__name__}')

        self.__model = model

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

            self.__timer.add()
            self.__print_progress(file_index)

            yield features, file_index

    def yield_and_store_features(
        self,
        band: str,
    ) -> None:
        for features, file_index in self.yield_features():
            self.__storage.create_file_features(
                features=features,
                band=band,
                file_index=file_index,
            )

    def __print_progress(self, file_index: int) -> None:
        timeleft = self.__timer.get_timeleft(file_index)

        print(
            f'Progress: {file_index + 1}/{self.__files_length}, '
            f'Timeleft: ~{timeleft}',
            end="\r"
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
        i = 0
        batch = sample_rate * 60 * 5  # TODO: Why 5 minutes?
        features: List[Tensor] = []

        while i < wav.shape[1]:
            samples: Tensor = wav[:, i:i + batch]
            samples_features = self.__forward_model(samples)

            i += batch
            features.append(samples_features)

        flattened_features: Tensor = self.__flatten_features(
            features
        )

        return flattened_features
