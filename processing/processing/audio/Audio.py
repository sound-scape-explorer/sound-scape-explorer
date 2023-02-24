from typing import Any, List, Union

import maad
import soundfile

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
    __spectrogram__amplitude: Union[Spectrogram, None]
    __spectrogram__amplitude_loaded: bool

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

        self.__spectrogram__amplitude = None
        self.__spectrogram__amplitude_loaded = False

        self.__frequencies = [f_min, f_max]
        self.__sanitize_frequencies()

        self.__read()

    def __sanitize_frequencies(self) -> None:
        if 0 in self.__frequencies:
            for i, _ in enumerate(self.__frequencies):
                if self.__frequencies[i] == 0:
                    self.__frequencies[i] = 1

    def __read(self) -> None:
        wav_info = soundfile.info(self.__path)
        frames = self.integration * wav_info.samplerate
        start = self.__group_index * frames

        self.__wav, self.sample_rate = soundfile.read(
            file=self.__path,
            frames=frames,
            start=start,
        )

        self.sound = maad.sound.select_bandwidth(
            x=self.__wav,
            fs=self.sample_rate,
            fcut=self.__frequencies,
            forder=6,
            fname='butter',
            ftype='bandpass',
        )

    def validate_sound_length(self) -> None:
        if self.is_sound_too_short():
            raise ValueError('')

    def is_sound_too_short(self) -> bool:
        return len(self.sound) <= 1024

    @property
    def spectrogram(self) -> Spectrogram:
        if self.__spectrogram_loaded is True:
            return self.__spectrogram

        self.__spectrogram_loaded = True

        try:
            self.validate_sound_length()

            s, tn, fn, ext = maad.sound.spectrogram(
                x=self.sound,
                fs=self.sample_rate,
            )

            self.__spectrogram = Spectrogram(s, tn, fn, ext)
        except ValueError:
            self.__spectrogram = None

        return self.__spectrogram

    @property
    def spectrogram_amplitude(self) -> Any:
        if self.__spectrogram__amplitude_loaded is True:
            return self.__spectrogram__amplitude

        self.__spectrogram__amplitude_loaded = True

        try:
            self.validate_sound_length()

            s, tn, fn, ext = maad.sound.spectrogram(
                x=self.sound,
                fs=self.sample_rate,
                mode='amplitude',
            )

            self.__spectrogram__amplitude = Spectrogram(s, tn, fn, ext)
        except ValueError:
            self.__spectrogram__amplitude = None

        return self.__spectrogram__amplitude
