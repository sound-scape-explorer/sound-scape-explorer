from typing import Optional

import maad
import pydub
from pydub import AudioSegment

from processing.config.files.FileConfig import FileConfig


class SoundLoader:
    audio: Optional[AudioSegment] = None
    sample_rate: Optional[int] = None

    def destroy(self):
        # this will raise `AttributeError` if you try loading the file again
        del self.audio
        del self.sample_rate

    def release(self):
        self.audio = None
        self.sample_rate = None

    def load(self, file: FileConfig):
        if self.audio is not None:
            return self.audio

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
