import numpy as np

from processing.constants import LEQ_SHORT_DT


def compute_leq_long(samples: np.ndarray):
    return 10 * np.log10(np.mean(samples**2))


def _compute_leq_short(
    samples: np.ndarray,
    sample_rate: int | float,
    dt: float = LEQ_SHORT_DT,
):
    dt_samples = int(dt * sample_rate)
    dts_per_window = int(len(samples) / dt_samples)
    samples_to_keep = int(dts_per_window * dt_samples)

    samples_trimmed = samples[:samples_to_keep]

    data = np.reshape(samples_trimmed, [dts_per_window, dt_samples])
    data = data**2

    return 10 * np.log10(np.mean(data, axis=1))


def compute_leq_percentile(
    samples: np.ndarray,
    sample_rate: int | float,
    percentile: int | float,  # 0 to 100
    dt: float = LEQ_SHORT_DT,
):
    if percentile < 0 or percentile > 100:
        raise ValueError("percentile must be between 0 and 100")

    leq_short = _compute_leq_short(samples, sample_rate, dt)
    return np.percentile(leq_short, 100 - percentile)
