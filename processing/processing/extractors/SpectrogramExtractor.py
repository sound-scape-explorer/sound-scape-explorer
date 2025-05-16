import warnings
from typing import Optional

import librosa
import numpy as np
from scipy import signal

from processing.constants import (
    EPSILON_32,
    SPECTRO_DBFS_REF,
    SPECTRO_STFT_WINDOW_TYPE,
    SPECTRO_STFT_WINDOW_MS,
    SPECTRO_STFT_OVERLAP_RATIO,
    SPECTRO_SCALE,
    WINDOW_MS,
    HOP_MS,
)
from processing.enums import FrequencyScale, StftWindowType
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib import audio
from processing.lib.frequency import get_band_edges
from processing.lib.numbers import clamp_number
from processing.lib.shapes import assert_shape
from processing.lib.utils import use_or_default


# TODO: maybe print out the band edges in configurator because a high number of bands
#  for a tiny frequency range will result "over banding"
class SpectrogramExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        n_bands: int,
        window_ms: int = WINDOW_MS,
        hop_ms: int = HOP_MS,
        scale: FrequencyScale = SPECTRO_SCALE,
        stft_window_type: StftWindowType = SPECTRO_STFT_WINDOW_TYPE,
        stft_window_ms: Optional[int] = SPECTRO_STFT_WINDOW_MS,
        stft_overlap_ratio: float = SPECTRO_STFT_OVERLAP_RATIO,
        dbfs_ref: float = SPECTRO_DBFS_REF,
    ):
        super().__init__(window_ms=window_ms, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high
        self.n_bands = n_bands

        self.stft_window_type = stft_window_type
        self.stft_window_ms = use_or_default(stft_window_ms, window_ms)
        self.stft_overlap_ratio = clamp_number(stft_overlap_ratio, 0.0, 1.0)

        self.scale = scale
        self.dbfs_ref = dbfs_ref

        self.band_edges = get_band_edges(
            scale=self.scale,
            freq_low=self.freq_low,
            freq_high=self.freq_high,
            n_bands=self.n_bands,
        )

    def extract(self, path):
        samples, sample_rate = audio.load(path)
        stft_window_samples = int(self.stft_window_ms / 1000 * sample_rate)
        stft_hop_samples = int(stft_window_samples * (1 - self.stft_overlap_ratio))
        n_fft = stft_window_samples

        frequencies = librosa.fft_frequencies(sr=sample_rate, n_fft=n_fft)
        dbfs_ref_norm = self.dbfs_ref / n_fft

        # stft window
        window_vector = signal.windows.get_window(
            self.stft_window_type.value.lower(),
            stft_window_samples,
        )
        window_norm = np.sum(window_vector**2)

        spectrums = []
        starts = []
        ends = []

        for window in self._iterate_samples(samples, sample_rate):
            starts.append(window.start)
            ends.append(window.end)

            stft = librosa.stft(
                window.samples,
                n_fft=n_fft,
                win_length=stft_window_samples,
                hop_length=stft_hop_samples,
                window=window_vector,
            )

            power_spectrum = np.abs(stft) ** 2 / (window_norm * n_fft)
            spectrum = np.zeros(self.n_bands)

            for i in range(self.n_bands):
                edge_low = self.band_edges[i]
                edge_high = self.band_edges[i + 1]
                band_mask = (frequencies >= edge_low) & (frequencies < edge_high)

                band_empty = not np.any(band_mask)
                if band_empty:
                    warnings.warn(
                        f"Band {i} is empty between {edge_low}-{edge_high} Hz. "
                        "Consider adjusting n_bands or frequency range.",
                        RuntimeWarning,
                    )
                    spectrum[i] = 10 * np.log10(EPSILON_32)
                    continue

                band_power = power_spectrum[band_mask]  # equivalent to ps[band_mask, :]
                band_energy = np.mean(band_power)
                spectrum[i] = 10 * np.log10(band_energy / dbfs_ref_norm + EPSILON_32)

            spectrums.append(spectrum)

        stack = np.stack(spectrums).astype(np.float32)
        assert_shape(stack, (len(starts), self.n_bands))

        return ExtractionDataRaw(
            embeddings=stack,
            starts=starts,
            ends=ends,
        )
