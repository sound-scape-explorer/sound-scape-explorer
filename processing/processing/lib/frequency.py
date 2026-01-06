import librosa
import numpy as np

from processing.enums import FrequencyScale


def get_band_edges(
    scale: FrequencyScale,
    freq_low: int,
    freq_high: int,
    n_bands: int,
):
    if scale is FrequencyScale.LIN:
        band_edges = np.linspace(freq_low, freq_high, n_bands + 1)
    elif scale == FrequencyScale.LOG:
        band_edges = np.logspace(np.log10(freq_low), np.log10(freq_high), n_bands + 1)
    elif scale is FrequencyScale.MEL:
        mel_min = librosa.hz_to_mel(freq_low)
        mel_max = librosa.hz_to_mel(freq_high)
        mel_points = np.linspace(mel_min, mel_max, n_bands + 1)
        band_edges = np.array([librosa.mel_to_hz(m) for m in mel_points])
    else:
        raise RuntimeError

    return band_edges
