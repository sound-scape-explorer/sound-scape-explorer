from typing import List

import sys
import time
from torch import Tensor
from torchaudio.backend.soundfile_backend import load as torchaudio_load

from processing.errors.DataLoaderSampleRateError import \
    DataLoaderSampleRateError
from processing.errors.DataLoaderSizeError import DataLoaderSizeError


class DataLoader():
    __input_path: str
    __output_path: str
    __band_parameters: List[int]
    __expected_sample_rate: int
    __next_parameter_index: int
    __timestamp_start: float
    __wav_data: Tensor
    __sample_rate: int

    def __init__(self):
        self.__set_paths()
        self.__set_band_params()
        self.__set_sample_rate()
        self.__set_next_parameters()
        self.__do()

    def __set_paths(self):
        self.__input_path = sys.argv[1]
        self.__output_path = sys.argv[2]

    def __set_band_params(self):
        band_parameters = sys.argv[3]
        self.__band_parameters = [int(v) for v in band_parameters.split('-')]

    def __set_sample_rate(self):
        self.__expected_sample_rate = int(sys.argv[4])

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
                f'Expected sample rate of {self.__expected_sample_rate} but '
                f'got '
                f'{self.__sample_rate}'
            )

    def __do(self):
        self.__verify_size()

        self.__timestamp_start = time.time()
        self.__wav_data, self.__sample_rate = torchaudio_load(self.__input_path)

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
