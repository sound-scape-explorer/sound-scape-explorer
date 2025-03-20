from typing import Literal, Any

import numpy as np

from processing.loaders.SoundSlice import SoundSlice
from processing.loaders.Spectrogram import Spectrogram
from processing.new.BandConfigNew import BandConfigNew
from processing.new.FileConfigNew import FileConfigNew


SpectrogramMode = Literal["psd", "amplitude"]
Ks = tuple[int, int]


class SoundLoaderNew:
    def __init__(self):
        self.audio = None
        self.sample_rate = None
        self.filtered = None
        self.spectrogram: dict[SpectrogramMode, dict[Ks, Any]] = {
            "psd": {},
            "amplitude": {},
        }

    def load(
        self,
        file: FileConfigNew,
        band: BandConfigNew,
    ):
        from pydub import AudioSegment

        sound: AudioSegment = AudioSegment.from_file(file.absolute_path)
        sample_rate: int = sound.frame_rate  # type: ignore

        self.audio = sound
        self.sample_rate = sample_rate

        self._create_filtered(band)

        return self

    def _create_filtered(self, band: BandConfigNew):
        from maad import sound

        samples = self.audio.get_array_of_samples()

        filtered: np.ndarray = sound.select_bandwidth(
            x=samples,
            fs=self.sample_rate,
            fcut=[band.low, band.high],
            forder=6,
            fname="butter",
            ftype="bandpass",
        )

        self.filtered = filtered.tolist()

    # TODO: move to _create?
    def get_spectrogram(
        self,
        slice_: SoundSlice,
        mode: SpectrogramMode = "psd",
    ):
        from maad import sound

        ks = (slice_.start, slice_.end)

        if ks in self.spectrogram[mode]:
            return self.spectrogram[mode][ks]

        s, tn, fn, ext = sound.spectrogram(
            x=np.array(slice_.sound),
            fs=self.sample_rate,
            mode=mode,
        )

        self.spectrogram[mode][ks] = Spectrogram(s, tn, fn, ext)
        return self.spectrogram[mode][ks]

    def release(self):
        self.audio = None
        self.sample_rate = None
        self.filtered = None
        self.spectrogram["psd"] = {}
        self.spectrogram["amplitude"] = {}
