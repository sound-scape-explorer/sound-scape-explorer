import numpy as np
from librosa import feature

from processing.constants import (
    SPECTRO_STFT_WINDOW_TYPE,
    SPECTRO_STFT_WINDOW_MS,
    SPECTRO_STFT_OVERLAP_RATIO,
    WINDOW_MS,
    HOP_MS,
)
from processing.enums import StftWindowType
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib import audio
from processing.lib.shapes import assert_shape


class MfccExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        n_bands: int,
        n_mfcc: int,
        window_ms: int = WINDOW_MS,
        hop_ms: int = HOP_MS,
        stft_window_type: StftWindowType = SPECTRO_STFT_WINDOW_TYPE,
        stft_window_ms: int | None = SPECTRO_STFT_WINDOW_MS,
        stft_overlap_ratio: float = SPECTRO_STFT_OVERLAP_RATIO,
    ):
        super().__init__(window_ms=window_ms, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high
        self.n_bands = n_bands
        self.n_mfcc = n_mfcc

        self.stft_window_type = stft_window_type
        self.stft_window_ms = (
            stft_window_ms if stft_window_ms is not None else window_ms
        )

        if stft_overlap_ratio < 0.0:
            self.stft_overlap_ratio = 0.0
        elif stft_overlap_ratio > 1.0:
            self.stft_overlap_ratio = 1.0
        else:
            self.stft_overlap_ratio = stft_overlap_ratio

    def extract(self, path):
        samples, sample_rate = audio.load(path)
        stft_window_samples = int(self.stft_window_ms / 1000 * sample_rate)
        stft_hop_samples = int(stft_window_samples * (1 - self.stft_overlap_ratio))
        n_fft = stft_window_samples + 1

        window_samples = int(self.window_ms / 1000 * sample_rate)
        stft_ratio = int(stft_window_samples / stft_hop_samples)
        frames_per_block = int((window_samples / stft_window_samples) * stft_ratio)

        mfccs = []
        starts = []
        ends = []

        for window in self._iterate_samples(samples, sample_rate):
            starts.append(window.start)
            ends.append(window.end)

            mfcc = feature.mfcc(
                y=window.samples,
                sr=sample_rate,
                n_mfcc=self.n_mfcc,
                n_fft=n_fft,
                window=self.stft_window_type.value.lower(),  # todo: should we actually create it or does mfcc handles this?
                hop_length=stft_hop_samples,
                win_length=stft_window_samples,
                n_mels=self.n_bands,
                fmin=self.freq_low,
                fmax=self.freq_high,
            )

            mfccs.append(mfcc.flatten())

        stack = np.stack(mfccs).astype(np.float32)
        assert_shape(stack, (len(starts), self.n_mfcc * frames_per_block))

        return ExtractionDataRaw(
            embeddings=stack,
            starts=starts,
            ends=ends,
        )
