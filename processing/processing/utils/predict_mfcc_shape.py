def predict_mfcc_shape(
    audio_duration_seconds: int | float,
    sample_rate: int | float,
    n_mfcc: int,
    window_ms: int,
    stft_window_ms: int,
    stft_overlap_ratio: float,
) -> tuple[int, int]:
    stft_window_samples = int(stft_window_ms / 1000 * sample_rate)
    stft_hop_samples = int(stft_window_samples * (1 - stft_overlap_ratio))
    window_samples = int(window_ms / 1000 * sample_rate)
    stft_ratio = int(stft_window_samples / stft_hop_samples)
    frames_per_block = int((window_samples / stft_window_samples) * stft_ratio)
    return int(audio_duration_seconds), n_mfcc * frames_per_block
