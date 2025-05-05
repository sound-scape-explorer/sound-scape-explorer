import librosa
import numpy as np
from scipy import signal


def read_duration(path: str) -> int:
    seconds = librosa.get_duration(filename=path)
    milliseconds = int(seconds * 1000)
    return milliseconds


# TODO: could this leverage the builtin onload resampling of librosa?
def load_resample_and_transpose(
    path: str,
    target_sample_rate: int,
    target_freq_low: int,
    target_freq_high: int,
    source_freq_low: int,
    source_freq_high: int,
):
    # i for input
    # o for output

    i_samples, i_sample_rate = librosa.load(
        path,
        sr=None,
        res_type="polyphase",
    )

    i_spectrum = np.fft.rfft(i_samples)

    o_spectrum = np.zeros(
        int(len(i_spectrum) * target_sample_rate / i_sample_rate),
        dtype=complex,
    )

    i_start = int(source_freq_low * len(i_spectrum) / (i_sample_rate / 2))
    i_end = int(source_freq_high * len(i_spectrum) / (i_sample_rate / 2))
    o_start = int(target_freq_low * len(o_spectrum) / (target_sample_rate / 2))
    o_end = int(target_freq_high * len(o_spectrum) / (target_sample_rate / 2))

    o_spectrum[o_start:o_end] = signal.resample(
        i_spectrum[i_start:i_end],
        o_end - o_start,
    )

    o_samples = np.fft.irfft(o_spectrum)
    print(o_spectrum)

    return o_samples
