import numpy as np
from keras import layers

from processing.constants import BIRDNET_WINDOW_MS
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib.audio import load_resample_and_transpose
from processing.lib.console import Console
from processing.resources.BirdNetResource import BirdNetResource


class BirdNetExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        hop_ms: int = BIRDNET_WINDOW_MS,
    ):
        super().__init__(window_ms=BIRDNET_WINDOW_MS, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high

        self.model_sample_rate = 48000
        self.model_freq_low = 0
        self.model_freq_high = 15000

        model_path = BirdNetResource.get_path()
        self.model = layers.TFSMLayer(model_path, call_endpoint="embeddings")

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
        embeddings = self.model(stack)["embeddings"]
        embeddings.shape.assert_is_compatible_with([len(starts), 1024])

        return ExtractionDataRaw(
            embeddings=embeddings.numpy(),
            starts=starts,
            ends=ends,
        )
