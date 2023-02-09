from pathlib import Path
from typing import Dict, List, Tuple

import torch
import torchaudio
from torch import Tensor

from processing.classes.NewConfig import (
    ConfigBand,
    ConfigBands,
    ConfigFiles,
    NewConfig,
)
from processing.classes.NewStorage import (
    NewStorage,
)
from processing.classes.NewTimer import NewTimer
from processing.models.VGGish import VGGish

Features = Dict[str, List[float]]


class NewExtractor:
    __config: NewConfig = NewConfig()
    __storage: NewStorage = NewStorage()
    __files: ConfigFiles = __config.get_files()
    __files_length: int = len(__config.get_files().keys())
    __timer: NewTimer = NewTimer(__files_length)
    __expected_sample_rate: int = __config.get_expected_sample_rate()
    __bands: ConfigBands = __config.get_bands()
    __features_by_band: Features = {}
    __model: VGGish

    def __init__(self) -> None:
        self.__iterate_files_over_bands()

    @staticmethod
    def __verify_path_existence(path_string: str) -> None:
        path = Path(path_string)

        if not path.exists():
            raise FileNotFoundError(f'Audio file not found: {path}')

    def __load_model(
        self,
        frequencies: ConfigBand,
    ) -> None:
        self.__model = VGGish([frequencies['low'], frequencies['high']])
        self.__model.eval()
        self.__timer.reset()

    def __verify_sample_rates(self, sample_rate: int) -> None:
        if sample_rate != self.__expected_sample_rate:
            raise ValueError(
                f'Sample rate differs from expected sample rate.'
            )

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

    def __iterate_files_over_bands(self) -> None:
        for band, frequencies in self.__bands.items():
            print(f'==> New band: {band} {frequencies} Hz')

            self.__load_model(frequencies)

            for file_index, item in enumerate(self.__files.items()):
                file, content = item
                path_string = f'./audio{file}'

                self.__verify_path_existence(path_string)

                if self.__storage.exists_file_features(band, file_index):
                    continue

                wav, sample_rate = self.__load_audio(path_string)

                self.__verify_sample_rates(sample_rate)

                wav = self.__fill_wav_to_round_duration(wav, sample_rate)
                features = self.__extract_features(wav, sample_rate)

                self.__storage.create_file_features(features, band, file_index)
                self.__timer.add()
                self.__print_progress(file_index)

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
        sample_rate: int,
    ) -> Tensor:
        if self.__model.device == 'cuda':
            return self.__model.forward(samples, fs=sample_rate).cpu()

        return self.__model.forward(samples, fs=sample_rate)

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
            samples_features = self.__forward_model(samples, sample_rate)

            i += batch
            features.append(samples_features)

        features: Tensor = self.__flatten_features(
            features
        )

        return features
