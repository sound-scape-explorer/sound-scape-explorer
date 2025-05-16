import numpy as np
from maad import sound, features

from processing.constants import WINDOW_MS, HOP_MS
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib import audio
from processing.lib.shapes import assert_shape


# frequency entropy index
class HfExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        window_ms: int = WINDOW_MS,
        hop_ms: int = HOP_MS,
    ):
        super().__init__(window_ms=window_ms, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high

    def extract(self, path):
        samples, sample_rate = audio.load(path)
        band = (self.freq_low, self.freq_high)

        hfs = []
        starts = []
        ends = []

        for window in self._iterate_samples(samples, sample_rate):
            starts.append(window.start)
            ends.append(window.end)

            sxx, tn, fn, ext = sound.spectrogram(
                window.samples,
                sample_rate,
                flims=band,
                mode="psd",
                # todo: add user params, which one? window nature?
                # todo: actually that would be better to use librosa's stft
                #  but the band splitting (fn freq vector) is bizarre
            )

            hf, _ = features.frequency_entropy(sxx)

            hfs.append([hf])

        stack = np.stack(hfs).astype(np.float32)
        assert_shape(stack, (len(starts), 1))

        return ExtractionDataRaw(
            embeddings=stack,
            starts=starts,
            ends=ends,
        )
