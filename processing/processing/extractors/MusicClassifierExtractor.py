import numpy as np
from keras import models, Model
from librosa import feature

from processing.constants import MUSICCLASS_WINDOW_MS
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib.audio import load_resample_and_transpose
from processing.lib.console import Console
from processing.lib.shapes import assert_shape
from processing.resources.MusicClassifierResource import MusicClassifierResource


class MusicClassifierExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        hop_ms: int = MUSICCLASS_WINDOW_MS,
    ):
        super().__init__(window_ms=MUSICCLASS_WINDOW_MS, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high

        self.model_sample_rate = 22050
        self.model_freq_low = 0
        self.model_freq_high = 11025

        self.model = self._load()

    @staticmethod
    def _load():
        model_path = MusicClassifierResource.get_path()
        model = models.load_model(model_path)
        input_layer = model.inputs[0]  # type: ignore
        output_embedding = model.layers[12].output  # type: ignore
        intermediate_model = Model(inputs=input_layer, outputs=output_embedding)
        intermediate_model.trainable = False
        return intermediate_model

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

        mfccs = []
        starts = []
        ends = []

        for window in self._iterate_samples(samples, self.model_sample_rate):
            starts.append(window.start)
            ends.append(window.end)

            mfcc = feature.mfcc(
                y=window.samples,
                sr=self.model_sample_rate,
                n_fft=2048,
                hop_length=512,
                n_mfcc=13,
            )
            mfccs.append(mfcc.T)

        stack = np.stack(mfccs).astype(np.float32)

        embeddings = self.model.predict(stack)
        assert_shape(embeddings, (len(starts), 960))

        return ExtractionDataRaw(
            embeddings=embeddings,
            starts=starts,
            ends=ends,
        )
