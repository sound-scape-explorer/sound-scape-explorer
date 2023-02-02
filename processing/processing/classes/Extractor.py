import pathlib
from pathlib import PosixPath
from typing import List

import numpy
import time
import torch

from processing.classes.AudioFiles import AudioFiles
from processing.classes.Config import Config
from processing.classes.ExtractorDataLoader import ExtractorDataLoader
from processing.classes.Timer import Timer
from processing.errors.ExtractorPathDuplicateError import \
    ExtractorPathDuplicateError
from processing.models.VGGish import VGGish
from processing.utils.convert_band_parameters_string_to_array import \
    convert_band_parameters_string_to_array
from processing.utils.prevent_keyboard_interrupt import PreventKeyboardInterrupt


class Extractor:
    """The extractor to get audio features from.

    Forward every audio file in configuration to VGGish NN model then saves
    the results to numpy compressed archives.

    Attributes:
        __force: The caller wants to force overwrites.
        __skip_existing: The caller wants to skip existing files.
        __done: The count of extracted files.
        __total: The total number of files to extract.
        __input_path: The current path to the source file to extract from.
        __output_path: The current target path to write the output file.
        __frequency_range: The current frequency range in Hz.
            Example `[1000, 5000]`
        __expected_sample_rate: The current expected sample rate in Hz.
    """
    __force: bool
    __skip_existing: bool
    __done: int
    __total: int
    __input_path: PosixPath
    __output_path: PosixPath
    __frequency_range: List[int] = []
    __expected_sample_rate: int

    def __init__(
        self,
        force: bool,
        skip_existing: bool,
    ) -> None:
        """Initialized `Extractor` with choices from the user whether to
        force overwrites and/or skip existing files.

        Args:
            force: The caller wants to force overwrites.
            skip_existing: The caller wants to skip existing files.
        """
        self.__force = force
        self.__skip_existing = skip_existing

        self.__config = Config()
        self.__audio_files = AudioFiles()

        self.__done = 0
        self.__total = len(self.__audio_files.files) * len(self.__config.bands)

        self.__timer = Timer(self.__total)

        self.__run()

    def __increment_done(self):
        self.__done += 1

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

    def __prepare_frequency_range(self, frequency_range_string: str):
        frequency_range_array = convert_band_parameters_string_to_array(
            frequency_range_string
        )

        if numpy.array_equal(frequency_range_array, self.__frequency_range):
            return

        self.__frequency_range = frequency_range_array

        print('')
        print(f'==> New band: {self.__frequency_range} Hz')
        print('')

        self.__load_model()

    def __load_model(self):
        self.__model = VGGish(self.__frequency_range)

    def __prepare_extraction(
        self,
        input_path: PosixPath,
        output_path: PosixPath,
        frequency_range_string,
        esr,
    ):
        self.__input_path = input_path
        self.__output_path = output_path
        self.__prepare_frequency_range(frequency_range_string)
        self.__expected_sample_rate = esr

        print('---')
        print(f'Extraction: {self.__done}/{self.__total}')
        self.__print_estimate()
        print(f'Path: {input_path}')

    def __run(self):
        for expected_sample_rate, band, frequency_range_string, fname, info, \
                input_path, output_path in \
                self.__audio_files.iterate_with_bands():

            already_exists = self.__verify_path_existence(output_path)

            if already_exists:
                continue

            self.__prepare_extraction(
                input_path,
                output_path,
                frequency_range_string,
                expected_sample_rate
            )

            self.__extract()
            self.__increment_done()

    def __print_estimate(self):
        estimate = self.__timer.get_timeleft(self.__done)
        print(f'Timeleft: ~{estimate}')
        self.__timer.reset()

    def __extract(self):
        data_loader = ExtractorDataLoader(
            self.__input_path,
            self.__output_path,
            self.__frequency_range,
            self.__expected_sample_rate,
        )

        input_path, output_path, band_params, t_start, wav_data, sample_rate, \
            next_param = data_loader.get()

        self.__model.eval()

        model_load_duration = time.time() - t_start
        self.__timer.add_seconds(model_load_duration)
        print(f'({model_load_duration:.3f} sec)... model file loaded')

        payload = []  # results file
        i = 0
        batch = int(sample_rate * 60 * 5)

        # completion to a integer number of seconds
        if wav_data.shape[1] % sample_rate != 0:
            wav_data = torch.cat(
                (wav_data, torch.zeros(
                    (1, int(sample_rate) - int(wav_data.shape[1] % sample_rate))
                )), 1
            )

        # cut the signal into batch samples (batch = 5 min of signal)
        while i < wav_data.shape[1]:
            samples = wav_data[:, i:i + batch]

            if self.__model.device == 'cuda':
                fts = self.__model.forward(samples, fs=sample_rate).cpu()
            else:
                fts = self.__model.forward(samples, fs=sample_rate)

            i += batch
            payload.append(fts)

        model_apply_duration = time.time() - t_start
        self.__timer.add_seconds(model_apply_duration)
        print(f'({model_apply_duration:.3f} sec)... model applied to all')

        pathlib.Path(output_path).absolute().parent.mkdir(
            parents=True,
            exist_ok=True
        )

        payload = torch.concat(payload).numpy()

        with PreventKeyboardInterrupt():
            numpy.savez_compressed(output_path, x=payload)

        disk_write_duration = time.time() - t_start
        self.__timer.add_seconds(disk_write_duration)
        print(f'({disk_write_duration:.3f} sec)... saved to disk')
