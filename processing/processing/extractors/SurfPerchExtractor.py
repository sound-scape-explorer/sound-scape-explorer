import numpy as np
import tensorflow_hub as hub

from processing.constants import SURFPERCH_WINDOW_MS
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib.audio import load_resample_and_transpose
from processing.lib.console import Console
from processing.resources.SurfPerchResource import SurfPerchResource


class SurfPerchExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        hop_ms: int = SURFPERCH_WINDOW_MS,
    ):
        super().__init__(window_ms=SURFPERCH_WINDOW_MS, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high

        self.model_sample_rate = 32000
        self.model_freq_low = 60
        self.model_freq_high = 10000

        model_path = SurfPerchResource.get_path()
        self.model = hub.load(model_path)

    @Console.mute_outputs
    def extract(self, path):
        samples = load_resample_and_transpose(
            path,
            target_sample_rate=self.model_sample_rate,
            target_freq_low=self.model_freq_low,
            target_freq_high=self.model_freq_high,
            source_freq_low=self.freq_low,
            source_freq_high=self.freq_high,
        )

        batch = []
        starts = []
        ends = []

        for window in self._iterate_samples(samples, self.model_sample_rate):
            batch.append(window.samples)
            starts.append(window.start)
            ends.append(window.end)

        stack = np.stack(batch)
        embeddings = self.model.infer_tf(stack)["embedding"]  # type: ignore
        embeddings.shape.assert_is_compatible_with([len(starts), 1280])

        return ExtractionDataRaw(
            embeddings=embeddings.numpy(),
            starts=starts,
            ends=ends,
        )
