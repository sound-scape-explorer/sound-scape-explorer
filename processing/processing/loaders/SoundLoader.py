from typing import Dict, List, Optional

import maad
import pydub
from numpy import ndarray
from pydub import AudioSegment

from processing.config.bands.BandConfig import BandConfig
from processing.config.files.FileConfig import FileConfig


class SoundLoader:
    __audio: Optional[AudioSegment] = None
    __sample_rate: Optional[int] = None

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

    def release(self):
        self.__audio = None
        self.__sample_rate = None

    def print_leftovers(self):
        print(type(self.__audio))

    def load(self, file: FileConfig):
        # print(f"SoundLoader: file index {file.index}")
        sound: pydub.AudioSegment = AudioSegment.from_file(file.path)
        sample_rate: int = sound.frame_rate  # type: ignore

        self.audio = sound
        self.sample_rate = sample_rate
        self.__filtered: Dict[str, List[float]] = {}
        return self.audio, sample_rate

    def slice(
        self,
        start: int,
        end: int,
    ) -> AudioSegment:
        assert self.audio is not None, "not loaded"
        slice: AudioSegment = self.audio[start:end]  # type: ignore
        return slice

    def get_filtered(self, band: BandConfig):
        kf = f"{band.low}-{band.high}"

        if kf in self.__filtered.keys():
            return self.__filtered[kf]

        samples = self.audio.get_array_of_samples()

        filtered: ndarray = maad.sound.select_bandwidth(
            x=samples,
            fs=self.sample_rate,
            fcut=[band.low, band.high],
            forder=6,
            fname="butter",
            ftype="bandpass",
        )

        self.__filtered[kf] = filtered.tolist()
        return self.__filtered[kf]
