from typing import List

import time
from torch import Tensor
from torchaudio.backend.soundfile_backend import load as torchaudio_load

from processing.errors.DataLoaderSampleRateError import \
    DataLoaderSampleRateError
from processing.errors.DataLoaderSizeError import DataLoaderSizeError


class DataLoader:
    __input_path: str
    __output_path: str
    __band_parameters: List[int]
    __expected_sample_rate: int
    __next_parameter_index: int
    __timestamp_start: float
    __wav_data: Tensor
    __sample_rate: int

    def __init__(
            self,
            input_path: str,
            output_path: str,
            band_parameters: List[int],
            expected_sample_rate: int,
    ):
        self.__input_path = input_path
        self.__output_path = output_path
        self.__band_parameters = band_parameters
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

    def __verify_size(self):
        if self.__band_parameters[0] - self.__band_parameters[1] < 64:
            raise DataLoaderSizeError(
                f'Band parameters do not allow to extract 64 bins, '
                f'i.e. {self.__band_parameters[0]}-{self.__band_parameters[1]}='
                f'{self.__band_parameters[0] - self.__band_parameters[1]} < 64'
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
        self.__verify_size()

        self.__timestamp_start = time.time()
        self.__wav_data, self.__sample_rate = torchaudio_load(
            self.__input_path
        )

        self.__print_success_log()

        self.__verify_sample_rate()

    def get(self):
        return self.__input_path, \
            self.__output_path, \
            self.__band_parameters, \
            self.__timestamp_start, \
            self.__wav_data, \
            self.__sample_rate, \
            self.__next_parameter_index
