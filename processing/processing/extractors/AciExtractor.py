import numpy as np
from maad import sound, features

from processing.constants import WINDOW_MS, HOP_MS
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib import audio
from processing.lib.shapes import assert_shape


# acoustic complexity index
class AciExtractor(Extractor):
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

        acis = []
        starts = []
        ends = []

        for window in self._iterate_samples(samples, sample_rate):
            starts.append(window.start)
            ends.append(window.end)

            sxx, tn, fn, ext = sound.spectrogram(
                window.samples,
                sample_rate,
                flims=band,
                mode="amplitude",
                # todo: add user params, which one? window nature?
                # todo: actually that would be better to use librosa's stft
                #  but the band splitting (fn freq vector) is bizarre
            )

            _, _, aci = features.acoustic_complexity_index(sxx)

            acis.append([aci])

        stack = np.stack(acis).astype(np.float32)
        assert_shape(stack, (len(starts), 1))

        return ExtractionDataRaw(
            embeddings=stack,
            starts=starts,
            ends=ends,
        )
