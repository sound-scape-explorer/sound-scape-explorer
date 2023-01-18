from pathlib import PosixPath
from typing import List

import time
import torchaudio
from torch import Tensor

from processing.errors.DataLoaderSampleRateError import \
    DataLoaderSampleRateError
from processing.errors.ExtractorDataLoaderAudioFileNotFoundError import \
    ExtractorDataLoaderAudioFileNotFoundError


class ExtractorDataLoader:
    __input_path: PosixPath
    __output_path: PosixPath
    __frequency_range: List[int]
    __expected_sample_rate: int
    __next_parameter_index: int
    __timestamp_start: float
    __wav_data: Tensor
    __sample_rate: int

    def __init__(
        self,
        input_path: PosixPath,
        output_path: PosixPath,
        frequency_range: List[int],
        expected_sample_rate: int,
    ):
        self.__input_path = input_path
        self.__output_path = output_path
        self.__frequency_range = frequency_range
        self.__expected_sample_rate = expected_sample_rate

        self.__set_next_parameters()
        self.__do()

    def __set_next_parameters(self):
        self.__next_parameter_index = 5

    def __print_success_log(self):
        print(
            f'({time.time() - self.__timestamp_start:.3f} sec)... audio file '
            f'loaded ('
            f'{self.__wav_data.shape}, rate {self.__sample_rate}, ~'
            f'{self.__wav_data.shape[1] / self.__sample_rate}sec)'
        )

    def __verify_sample_rate(self):
        if self.__sample_rate != self.__expected_sample_rate:
            raise DataLoaderSampleRateError(
                f'Expected sample rate of '
                f'{self.__expected_sample_rate} but '
                f'got '
                f'{self.__sample_rate}'
            )

    def __do(self):
        self.__timestamp_start = time.time()

        if not self.__input_path.exists():
            raise ExtractorDataLoaderAudioFileNotFoundError(
                f'Audio file not found: {self.__input_path}'
            )

        # noinspection PyUnresolvedReferences
        self.__wav_data, self.__sample_rate = torchaudio.load(
            str(self.__input_path)
        )

        self.__print_success_log()
        self.__verify_sample_rate()

    def get(self):
        return self.__input_path, \
            self.__output_path, \
            self.__frequency_range, \
            self.__timestamp_start, \
            self.__wav_data, \
            self.__sample_rate, \
            self.__next_parameter_index
