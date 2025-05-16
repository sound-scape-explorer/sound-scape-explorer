import numpy as np
from maad import sound, features

from processing.constants import ADI_IMPL
from processing.enums import AdiImpl
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib import audio
from processing.lib.shapes import assert_shape


# acoustic diversity index
class AdiExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        window_ms: int = 1000,
        hop_ms: int | None = None,
        bin_step: int = 500,
        db_threshold: int = -50,
        index: AdiImpl = ADI_IMPL,
    ):
        super().__init__(window_ms=window_ms, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high

        self.bin_step = bin_step
        self.db_threshold = db_threshold
        self.index = index

    def extract(self, path):
        samples, sample_rate = audio.load(path)
        band = (self.freq_low, self.freq_high)

        adis = []
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

            adi = features.acoustic_diversity_index(
                Sxx=sxx,
                fn=fn,
                fmin=self.freq_low,
                fmax=self.freq_high,
                index=self.index.value.lower(),
                bin_step=self.bin_step,
                dB_threshold=self.db_threshold,
                # todo: we used this in the legacy impl
                #  fmax=10000,
            )

            adis.append([adi])

        stack = np.stack(adis).astype(np.float32)
        assert_shape(stack, (len(starts), 1))

        return ExtractionDataRaw(
            embeddings=stack,
            starts=starts,
            ends=ends,
        )
