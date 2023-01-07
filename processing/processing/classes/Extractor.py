import pathlib
from typing import List

import numpy
import time
import torch

from processing.classes.AudioFiles import AudioFiles
from processing.classes.ExtractorDataLoader import ExtractorDataLoader
from processing.errors.ExtractorPathDuplicateError import \
    ExtractorPathDuplicateError
from processing.models.VGGish import VGGish
from processing.utils.convert_band_parameters_string_to_array import \
    convert_band_parameters_string_to_array
from processing.utils.prevent_keyboard_interrupt import PreventKeyboardInterrupt


class Extractor:
    __force: bool
    __skip_existing: bool
    __todo: int
    __total: int
    __done: int
    __input_path: str
    __output_path: str
    __band_parameters: List[int] = []
    __expected_sample_rate: int

    def __init__(self, force: bool, skip_existing: bool):
        self.__force = force
        self.__skip_existing = skip_existing
        self.__features_extension = '.npz'

        self.__audio_files = AudioFiles(
            '@feature_base',
            self.__features_extension
        )

        self.__todo = 0
        self.__total = 0
        self.__done = 0

        self.__run()

    def __increment_todo(self):
        self.__todo += 1

    def __increment_total(self):
        self.__total += 1

    def __verify_path_existence(self, output_path) -> bool:
        if output_path.exists() and not self.__force:
            if self.__skip_existing:
                print(f'... skipping {output_path}')
                return True
            raise ExtractorPathDuplicateError(
                f'"{output_path}" exists (-s to skip existing, '
                f'or -f to '
                f'overwrite).'
            )

        return False

    def __prepare_band_parameters(self, band_parameters: str):
        band_parameters_array = convert_band_parameters_string_to_array(
            band_parameters
        )

        if numpy.array_equal(band_parameters_array, self.__band_parameters):
            return

        self.__band_parameters = band_parameters_array

        print('')
        print(f'==> New band: {self.__band_parameters}')
        print('')

        self.__load_model()

    def __load_model(self):
        self.__model = VGGish(self.__band_parameters)

    def __prepare_extraction(self, input_path, output_path, spec, esr):
        self.__done += 1

        self.__input_path = input_path
        self.__output_path = output_path
        self.__prepare_band_parameters(spec)
        self.__expected_sample_rate = esr

        print(
            f'Processing {input_path} ({self.__done}/'
            f'{self.__todo}/{self.__total})'
        )

    def __run(self):
        for esr, band, spec, fname, info, input_path, output_path in \
                self.__audio_files.iterate_with_bands():
            self.__increment_total()

            already_exists = self.__verify_path_existence(output_path)

            if already_exists:
                continue

            self.__increment_todo()
            self.__prepare_extraction(input_path, output_path, spec, esr)
            self.__extract()

    def __extract(self):
        data_loader = ExtractorDataLoader(
            self.__input_path,
            self.__output_path,
            self.__band_parameters,
            self.__expected_sample_rate,
        )

        input_path, output_path, band_params, t_start, wav_data, sample_rate, \
            next_param = data_loader.get()

        self.__model.eval()

        print(f'({time.time() - t_start:.3f} sec)... model file loaded')

        payload = []  # results file
        i = 0
        batch = int(sample_rate * 60 * 5)

        if wav_data.shape[1] % sample_rate != 0:
            wav_data = torch.cat(
                (wav_data, torch.zeros(
                    (1, int(sample_rate) - int(wav_data.shape[1] % sample_rate))
                )), 1
            )

        while i < wav_data.shape[1]:
            samples = wav_data[:, i:i + batch]

            if self.__model.device == 'cuda':
                fts = self.__model.forward(samples, fs=sample_rate).cpu()
            else:
                fts = self.__model.forward(samples, fs=sample_rate)

            i += batch
            payload.append(fts)

        print(f'({time.time() - t_start:.3f} sec)... model applied to all')

        pathlib.Path(output_path).absolute().parent.mkdir(
            parents=True,
            exist_ok=True
        )

        payload = torch.concat(payload).numpy()

        with PreventKeyboardInterrupt():
            numpy.savez_compressed(output_path, x=payload)

        print(f'({time.time() - t_start:.3f} sec)... saved to disk')
