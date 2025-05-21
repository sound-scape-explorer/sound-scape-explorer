import numpy as np
import tensorflow_hub as hub

from processing.constants import VGGISH_WINDOW_MS
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib.audio import load_resample_and_transpose
from processing.lib.console import Console
from processing.resources.VggishResource import VggishResource


class VggishExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        hop_ms: int = VGGISH_WINDOW_MS,
    ):
        super().__init__(window_ms=VGGISH_WINDOW_MS, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high

        self.model_sample_rate = 16000
        self.model_freq_low = 125
        self.model_freq_high = 7500

        model_path = VggishResource.get_path()
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

        samples_to_trim = int((1 - 0.97) * self.model_sample_rate)

        batch = []
        starts = []
        ends = []

        for window in self._iterate_samples(samples, self.model_sample_rate):
            starts.append(window.start)
            ends.append(window.end)

            chunk = window.samples[:-samples_to_trim]
            batch.append(chunk)

        stack = np.stack(batch).flatten()
        embeddings = self.model(stack)  # type: ignore
        embeddings.shape.assert_is_compatible_with((len(starts), 128))

        return ExtractionDataRaw(
            embeddings=embeddings.numpy(),
            starts=starts,
            ends=ends,
        )
