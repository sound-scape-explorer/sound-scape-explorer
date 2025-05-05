import librosa
import numpy as np
from maad import features

from processing.constants import WINDOW_MS, HOP_MS, HT_FRAME_SIZE
from processing.extractors.Extractor import Extractor, ExtractedDataRaw
from processing.lib.shapes import assert_shape


# temporal entropy index
class HtExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        window_ms: int = WINDOW_MS,
        hop_ms: int = HOP_MS,
        frame_size: int = HT_FRAME_SIZE,
    ):
        super().__init__(window_ms=window_ms, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high

        self.frame_size = frame_size

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

        hts = []
        starts = []
        ends = []

        for window in self._iterate_samples(filtered, sample_rate):
            starts.append(window.start)
            ends.append(window.end)

            ht = features.temporal_entropy(
                window.samples,
                Nt=self.frame_size,
            )

            hts.append([ht])

        stack = np.stack(hts).astype(np.float32)
        assert_shape(stack, (len(starts), 1))

        return ExtractedDataRaw(
            embeddings=stack,
            starts=starts,
            ends=ends,
        )
