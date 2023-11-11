from typing import Dict, List, Literal

import numpy as np
import pydub
from pydub import AudioSegment

from processing.config.bands.BandConfig import BandConfig
from processing.config.files.FileConfig import FileConfig
from processing.loaders.SoundSlice import SoundSlice
from processing.loaders.Spectrogram import Spectrogram

FilteredKey = str
SoundSliceStartEnd = str
SpectrogramMode = Literal["psd", "amplitude"]


class SoundLoader:
    @property
    def audio(self) -> AudioSegment:
        assert self.__audio is not None, "Please load file"
        return self.__audio

    @audio.setter
    def audio(self, audio: AudioSegment) -> None:
        self.__audio = audio

    @property
    def sample_rate(self) -> int:
        assert self.__sample_rate is not None, "Please load file"
        return self.__sample_rate

    @sample_rate.setter
    def sample_rate(self, sample_rate: int) -> None:
        self.__sample_rate = sample_rate

    def destroy(self):
        # this will raise `AttributeError` if you try loading the file again
        del self.__audio
        del self.__sample_rate
        del self.__filtered
        del self.__spectrograms

    def release(self):
        self.__audio = None
        self.__sample_rate = None
        self.__initialize_filtered()
        self.__initialize_spectrogram()

    def print_leftovers(self):
        print("Audio: ", type(self.__audio))
        print("Sample rate: ", type(self.__sample_rate))
        print("Filtered keys: ", self.__filtered.keys())
        print("Spectrogram psd: ", self.__spectrograms["psd"].keys())
        print("Spectrogram amplitude: ", self.__spectrograms["amplitude"].keys())

    def __initialize_filtered(self):
        self.__filtered: Dict[FilteredKey, List[float]] = {}

    def __initialize_spectrogram(self):
        self.__spectrograms: Dict[
            SpectrogramMode, Dict[SoundSliceStartEnd, Spectrogram]
        ] = {}
        self.__spectrograms["psd"] = {}
        self.__spectrograms["amplitude"] = {}

    def load(self, file: FileConfig):
        # print(f"SoundLoader: file index {file.index}")
        sound: pydub.AudioSegment = AudioSegment.from_file(file.path)
        sample_rate: int = sound.frame_rate  # type: ignore

        self.audio = sound
        self.sample_rate = sample_rate

        self.__initialize_filtered()
        self.__initialize_spectrogram()

        return self.audio, sample_rate

    def slice(
        self,
        start: int,
        end: int,
    ) -> AudioSegment:
        assert self.audio is not None, "not loaded"
        slice_: AudioSegment = self.audio[start:end]  # type: ignore
        return slice_

    def get_filtered(self, band: BandConfig):
        import maad

        kf = f"{band.low}-{band.high}"

        if kf in self.__filtered.keys():
            return self.__filtered[kf]

        samples = self.audio.get_array_of_samples()

        filtered: np.ndarray = maad.sound.select_bandwidth(
            x=samples,
            fs=self.sample_rate,
            fcut=[band.low, band.high],
            forder=6,
            fname="butter",
            ftype="bandpass",
        )

        self.__filtered[kf] = filtered.tolist()
        return self.__filtered[kf]

    def get_spectrogram(
        self,
        slice_: SoundSlice,
        mode: SpectrogramMode = "psd",
    ) -> Spectrogram:
        import maad

        ks = f"{slice_.start}-{slice_.end}"

        if ks in self.__spectrograms[mode].keys():
            return self.__spectrograms[mode][ks]

        s, tn, fn, ext = maad.sound.spectrogram(
            x=np.array(slice_.sound),
            fs=self.sample_rate,
            mode=mode,
        )

        self.__spectrograms[mode][ks] = Spectrogram(s, tn, fn, ext)
        return self.__spectrograms[mode][ks]
