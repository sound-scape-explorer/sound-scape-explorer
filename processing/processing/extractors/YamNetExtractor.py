import numpy as np
import tensorflow as tf
import tensorflow_hub as hub

from processing.constants import YAMNET_WINDOW_MS
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib.audio import load_resample_and_transpose
from processing.lib.console import Console
from processing.lib.shapes import assert_shape
from processing.resources.YamNetResource import YamNetResource


class YamNetExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        hop_ms: int = YAMNET_WINDOW_MS,
    ):
        super().__init__(window_ms=YAMNET_WINDOW_MS, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high

        self.model_sample_rate = 16000
        self.model_freq_low = 125
        self.model_freq_high = 7500

        model_path = YamNetResource.get_path()
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

        samples_to_trim = int((1 - 0.96) * self.model_sample_rate)

        all_embeddings = []
        starts = []
        ends = []

        for window in self._iterate_samples(samples, self.model_sample_rate):
            starts.append(window.start)
            ends.append(window.end)

            chunk = window.samples[:-samples_to_trim]
            _scores, embeddings, _log_mel_spectrogram = self.model(chunk)  # type: ignore
            embeddings = tf.reshape(embeddings, [-1])
            all_embeddings.append(embeddings)

        all_embeddings = np.stack(all_embeddings)
        assert_shape(all_embeddings, (len(starts), 1024))

        return ExtractionDataRaw(
            embeddings=all_embeddings,
            starts=starts,
            ends=ends,
        )
