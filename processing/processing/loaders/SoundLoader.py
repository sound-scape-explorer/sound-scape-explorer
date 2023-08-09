from typing import Optional

import maad
import pydub
from pydub import AudioSegment

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
        return self.audio, sample_rate

    def slice(
        self,
        start: int,
        end: int,
    ) -> AudioSegment:
        assert self.audio is not None, "not loaded"
        slice: AudioSegment = self.audio[start:end]  # type: ignore
        return slice

    def filter(
        self,
        audio: AudioSegment,
        low: int,
        high: int,
    ):
        assert self.sample_rate is not None, "not loaded"

        try:
            return maad.sound.select_bandwidth(
                x=audio.get_array_of_samples(),
                fs=self.sample_rate,
                fcut=[low, high],
                forder=6,
                fname="butter",
                ftype="bandpass",
            )
        except ValueError:
            return []
