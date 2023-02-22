import numpy


def get_band_freq_bounds(sr, band_params):
    spectro_freq = sr // 2
    mel_max = 2595 * numpy.log10(1 + spectro_freq / 700)
    hz = lambda m: 700 * (10 ** (m / 2595) - 1)
    mel_start = band_params[1] / band_params[0] * mel_max
    mel_end = (band_params[1] + 64) / band_params[0] * mel_max
    return hz(mel_start), hz(mel_end)
