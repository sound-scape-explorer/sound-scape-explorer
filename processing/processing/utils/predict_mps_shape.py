def predict_mps_shape(
    audio_duration_sec: float,
    sample_rate: int,
    window_ms: int,
    hop_ms: int,
    stft_1_window_ms: int,
    stft_1_overlap_ratio: float,
    stft_2_window_ms: int,
    n_bands: int,
    max_modulation_freq: int,
) -> tuple[int, int]:

    # Time windows
    audio_duration_ms = audio_duration_sec * 1000
    n_time_windows = int((audio_duration_ms - window_ms) / hop_ms) + 1

    # STFT 1 params
    stft_1_window_samples = int(stft_1_window_ms / 1000 * sample_rate)
    stft_1_hop_samples = int(stft_1_window_samples * (1 - stft_1_overlap_ratio))

    # STFT 2 params
    stft_2_window_samples = int(stft_2_window_ms / 1000 * sample_rate)
    if stft_2_window_samples % 2 == 0:
        stft_2_window_samples += 1

    # Time resolution
    time_resolution = stft_1_hop_samples / sample_rate

    # Modulation spectrum width comes from fft2 of the stft_2 windowed chunk
    # which has shape (n_bands, stft_2_window_samples)
    mod_spectrum_width = stft_2_window_samples

    # Modulation frequency limit
    mod_freq_limit_bin_count = int(
        max_modulation_freq * mod_spectrum_width * time_resolution
    )

    # Dimensions
    acoustic_freq_bins = n_bands // 2
    modulation_freq_bins = 2 * mod_freq_limit_bin_count

    flattened_size = acoustic_freq_bins * modulation_freq_bins

    return n_time_windows, flattened_size
