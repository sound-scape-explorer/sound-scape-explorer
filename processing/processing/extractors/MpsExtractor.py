from typing import Optional, NamedTuple

import librosa
import numpy as np
from scipy.fftpack import next_fast_len, fft2, fftshift
from scipy.signal.windows import gaussian

from processing.constants import (
    EPSILON_32,
    MPS_STFT_1_WINDOW_MS,
    MPS_STFT_1_OVERLAP_RATIO,
    MPS_STFT_2_WINDOW_MS,
    MPS_STFT_2_OVERLAP_RATIO,
    MPS_SCALE,
)
from processing.constants import WINDOW_MS, HOP_MS
from processing.enums import FrequencyScale
from processing.extractors.Extractor import Extractor, ExtractionDataRaw
from processing.lib import audio
from processing.lib.frequency import get_band_edges
from processing.lib.numbers import clamp_number
from processing.lib.utils import use_or_default


class _StftParams(NamedTuple):
    stft_1_window_samples: int
    stft_1_hop_samples: int
    stft_1_window_norm: np.ndarray
    stft_1_n_fft: int
    stft_2_window_samples: int
    stft_2_hop_samples: int
    stft_2_deviation: float
    stft_2_window_norm: np.ndarray
    time_resolution: float


class MpsExtractor(Extractor):
    def __init__(
        self,
        freq_low: int,
        freq_high: int,
        n_bands: int,
        window_ms: int = WINDOW_MS,
        hop_ms: int = HOP_MS,
        scale: FrequencyScale = MPS_SCALE,
        stft_1_window_ms: Optional[int] = MPS_STFT_1_WINDOW_MS,
        stft_1_overlap_ratio: float = MPS_STFT_1_OVERLAP_RATIO,
        stft_2_window_ms: Optional[int] = MPS_STFT_2_WINDOW_MS,
        stft_2_overlap_ratio: float = MPS_STFT_2_OVERLAP_RATIO,
        dynamic_range_db: int = 50,
        max_modulation_freq: int = 100,
    ):
        super().__init__(window_ms=window_ms, hop_ms=hop_ms)

        self.freq_low = freq_low
        self.freq_high = freq_high

        self.stft_1_window_ms = use_or_default(stft_1_window_ms, window_ms)
        self.stft_1_overlap_ratio = clamp_number(stft_1_overlap_ratio, 0.0, 1.0)
        self.stft_2_window_ms = use_or_default(stft_2_window_ms, window_ms)
        self.stft_2_overlap_ratio = clamp_number(stft_2_overlap_ratio, 0.0, 1.0)

        self.n_bands = n_bands
        self.scale = scale

        self.band_edges = get_band_edges(
            scale=self.scale,
            freq_low=self.freq_low,
            freq_high=self.freq_high,
            n_bands=self.n_bands,
        )

        self.dynamic_range_db = dynamic_range_db
        self.max_modulation_freq = max_modulation_freq

    def _get_stft_params(self, sample_rate: int | float) -> _StftParams:
        gaussian_std_span = 6
        stft_1_std_dev = 6

        # first stft params
        stft_1_window_samples = int(self.stft_1_window_ms / 1000 * sample_rate)
        stft_1_hop_samples = int(
            stft_1_window_samples * (1 - self.stft_1_overlap_ratio)
        )

        stft_1_window_vector = gaussian(
            stft_1_window_samples,
            stft_1_std_dev,
            sym=False,
        )

        stft_1_window_norm = stft_1_window_vector / (
            np.sqrt(2 * np.pi) * stft_1_std_dev
        )

        stft_1_n_fft = next_fast_len(len(stft_1_window_norm))

        # second stft params
        stft_2_window_samples = int(self.stft_2_window_ms / 1000 * sample_rate)

        stft_2_window_samples_is_pair = stft_2_window_samples % 2 == 0
        if stft_2_window_samples_is_pair:
            stft_2_window_samples += 1

        stft_2_hop_samples = int(
            stft_2_window_samples * (1 - self.stft_2_overlap_ratio)
        )

        stft_2_deviation = stft_2_window_samples / gaussian_std_span

        stft_2_window_vector = gaussian(
            stft_2_window_samples,
            stft_2_deviation,
            sym=False,
        )

        stft_2_window_norm = stft_2_window_vector / (
            np.sqrt(2 * np.pi) * stft_2_deviation
        )

        time_resolution = stft_1_hop_samples / sample_rate

        params = _StftParams(
            stft_1_n_fft=stft_1_n_fft,
            stft_1_window_samples=stft_1_window_samples,
            stft_1_hop_samples=stft_1_hop_samples,
            stft_1_window_norm=stft_1_window_norm,
            stft_2_window_samples=stft_2_window_samples,
            stft_2_hop_samples=stft_2_hop_samples,
            stft_2_deviation=stft_2_deviation,
            stft_2_window_norm=stft_2_window_norm,
            time_resolution=time_resolution,
        )

        return params

    def extract(self, path):
        samples, sample_rate = audio.load(path)

        filtered = self._filter(
            samples=samples,
            sample_rate=sample_rate,
            freq_low=self.freq_low,
            freq_high=self.freq_high,
        )

        params = self._get_stft_params(sample_rate)

        mpss = []
        starts = []
        ends = []

        for window in self._iterate_samples(filtered, sample_rate):
            starts.append(window.start)
            ends.append(window.end)

            # First STFT
            stft_1 = librosa.stft(
                window.samples,
                n_fft=params.stft_1_n_fft,
                win_length=params.stft_1_window_samples,
                hop_length=params.stft_1_hop_samples,
                window=params.stft_1_window_norm,
                center=True,
                pad_mode="constant",
            )

            # Get frequencies for each bin
            frequencies = librosa.fft_frequencies(
                sr=sample_rate,
                n_fft=params.stft_1_n_fft,
            )

            # Create a band-filtered spectrogram
            stft_1_filtered = np.zeros(
                (self.n_bands, stft_1.shape[1]),
                dtype=complex,
            )

            # Apply band filtering
            for i in range(self.n_bands):
                edge_low = self.band_edges[i]
                edge_high = self.band_edges[i + 1]
                band_mask = (frequencies >= edge_low) & (frequencies < edge_high)

                # Skip empty bands
                if not np.any(band_mask):
                    continue

                # Average complex STFT values in this band
                stft_1_filtered[i] = np.mean(stft_1[band_mask, :], axis=0)

            # Convert to dB scale
            stft_1_log = 20 * np.log10(np.abs(stft_1_filtered) + EPSILON_32)

            # Rescale first spectrogram
            stft_1_max = stft_1_log.max()
            stft_1_min = stft_1_max - self.dynamic_range_db
            stft_1_min_mask = stft_1_log < stft_1_min
            stft_1_log[stft_1_min_mask] = stft_1_min
            stft_1_log -= stft_1_log.mean()
            stft_1_log /= stft_1_log.std()

            # Padding first spectrogram
            stft_2_pad_size = (params.stft_2_window_samples - 1) // 2
            min_val = stft_1_log.min()
            pad = np.full((stft_1_log.shape[0], stft_2_pad_size), min_val)
            stft_1_log_padded = np.concatenate((pad, stft_1_log, pad), axis=1)

            # Sliding modulation analysis
            mod_power_average = None
            chunk_count = 0

            for idx_start in range(
                0,
                stft_1_log_padded.shape[1] - params.stft_2_window_samples + 1,
                params.stft_2_hop_samples,
            ):
                idx_end = idx_start + params.stft_2_window_samples
                windowed_spectrum = (
                    stft_1_log_padded[:, idx_start:idx_end] * params.stft_2_window_norm
                )
                modulation_spectrum = fftshift(fft2(windowed_spectrum))
                mod_power_spectrum = np.abs(modulation_spectrum) ** 2

                if mod_power_average is None:
                    mod_power_average = mod_power_spectrum
                else:
                    mod_power_average += mod_power_spectrum

                chunk_count += 1

            if mod_power_average is None:
                raise Exception("mps_power_average is None")

            # Run average and dB conversion
            mod_power_average /= chunk_count
            mps_log = 10.0 * np.log10(mod_power_average + EPSILON_32)

            # Modulation frequency limit
            mod_freq_limit_bin_count = int(
                self.max_modulation_freq
                * mod_power_average.shape[1]
                * params.time_resolution
            )

            # Extract relevant regions of the modulation spectrum
            # Keep positive frequencies and limited range around the center
            acoustic_freq_cutoff = mps_log.shape[0] // 2
            mod_freq_low_cutoff = mps_log.shape[1] // 2 - mod_freq_limit_bin_count
            mod_freq_high_cutoff = mps_log.shape[1] // 2 + mod_freq_limit_bin_count

            mps_log_rescaled: np.ndarray = mps_log[
                acoustic_freq_cutoff:,
                mod_freq_low_cutoff:mod_freq_high_cutoff,
            ]

            mpss.append(mps_log_rescaled.flatten())

        stack = np.stack(mpss).astype(np.float32)

        # todo: add shape assertion later

        return ExtractionDataRaw(
            embeddings=stack,
            starts=starts,
            ends=ends,
        )
