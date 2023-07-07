from typing import List, Union

import maad
from pydub import AudioSegment

from processing.audio.enums.SpectrogramMode import SpectrogramMode
from processing.audio.Spectrogram import Spectrogram


class Audio:
    __path: str
    integration: int
    __group_index: int
    __frequencies: List[int]
    __wav: List[float]
    sample_rate: int
    sound: List[float]
    __spectrogram: Union[Spectrogram, None]
    __spectrogram_loaded: bool
    __spectrogram_amplitude: Union[Spectrogram, None]
    __spectrogram_amplitude_loaded: bool

    def __init__(
        self,
        path: str,
        f_min: int,
        f_max: int,
        integration: int,
        group_index: int,
    ) -> None:
        self.__path = path
        self.integration = integration
        self.__group_index = group_index

        self.__spectrogram = None
        self.__spectrogram_loaded = False

        self.__spectrogram_amplitude = None
        self.__spectrogram_amplitude_loaded = False

        self.__frequencies = [f_min, f_max]
        self.__sanitize_frequencies()

        self.__read()

    def __sanitize_frequencies(self) -> None:
        if 0 not in self.__frequencies:
            return

        for i, _ in enumerate(self.__frequencies):
            if self.__frequencies[i] == 0:
                self.__frequencies[i] = 1

    def __read(self) -> None:
        sound = AudioSegment.from_file(self.__path)

        sound_start = self.__group_index * self.integration * 1000
        sound_length = sound_start + self.integration * 1000
        sound_slice = sound[sound_start:sound_length]

        self.__wav = sound_slice.get_array_of_samples()
        self.sample_rate = sound.frame_rate

        try:
            self.sound = maad.sound.select_bandwidth(
                x=self.__wav,
                fs=self.sample_rate,
                fcut=self.__frequencies,
                forder=6,
                fname="butter",
                ftype="bandpass",
            )
        except ValueError:
            self.sound = []

    def validate_sound_length(self) -> None:
        if self.is_sound_too_short():
            raise ValueError("")

    def is_sound_too_short(self) -> bool:
        return len(self.sound) <= 1024

    def __get_spectrogram(
        self,
        mode: SpectrogramMode = SpectrogramMode.psd,
    ) -> Union[Spectrogram, None]:
        try:
            self.validate_sound_length()

            s, tn, fn, ext = maad.sound.spectrogram(
                x=self.sound,
                fs=self.sample_rate,
                mode=mode.value,
            )

            spectrogram = Spectrogram(s, tn, fn, ext)
        except ValueError:
            spectrogram = None

        return spectrogram

    @property
    def spectrogram(self) -> Union[Spectrogram, None]:
        if self.__spectrogram_loaded is True:
            return self.__spectrogram

        self.__spectrogram = self.__get_spectrogram()
        self.__spectrogram_loaded = True
        return self.__spectrogram

    @property
    def spectrogram_amplitude(self) -> Union[Spectrogram, None]:
        if self.__spectrogram_amplitude_loaded is True:
            return self.__spectrogram_amplitude

        self.__spectrogram_amplitude = self.__get_spectrogram(
            mode=SpectrogramMode.amplitude
        )

        self.__spectrogram_amplitude_loaded = True
        return self.__spectrogram_amplitude
