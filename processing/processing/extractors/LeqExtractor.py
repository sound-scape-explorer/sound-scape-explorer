import librosa
import numpy as np

from processing.constants import WINDOW_MS, HOP_MS
from processing.extractors.Extractor import Extractor, ExtractedDataRaw
from processing.lib.leq import compute_leq_long
from processing.lib.shapes import assert_shape


class LeqExtractor(Extractor):
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
        samples, sample_rate = librosa.load(
            path,
            sr=None,
            res_type="polyphase",
        )

        filtered = self._filter(
            samples,
            sample_rate,
            self.freq_low,
            self.freq_high,
        )

        leqs = []
        starts = []
        ends = []

        for window in self._iterate_samples(filtered, sample_rate):
            starts.append(window.start)
            ends.append(window.end)
            leq = compute_leq_long(window.samples)
            leqs.append([leq])

        stack = np.stack(leqs).astype(np.float32)
        assert_shape(stack, (len(starts), 1))

        return ExtractedDataRaw(
            embeddings=stack,
            starts=starts,
            ends=ends,
        )
