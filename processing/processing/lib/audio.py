import librosa
import numpy as np
import soundfile as sf
from scipy.ndimage import map_coordinates


def read_duration(path: str) -> int:
    seconds = librosa.get_duration(filename=path)
    milliseconds = int(seconds * 1000)
    return milliseconds


def load(path: str, sample_rate: int | None = None):
    samples, sr = librosa.load(
        path,
        sr=sample_rate,
        res_type="polyphase",
    )

    return samples, sr


def load_resample_and_transpose(
    path: str,
    target_sample_rate: int,
    target_freq_low: int,
    target_freq_high: int,
    source_freq_low: int,
    source_freq_high: int,
    n_fft: int = 2048,
    hop_length: int | None = None,
):
    """
    - `i_` prefix for input related data
    - `o_` prefix for output related data
    """

    # optional resampling
    file_sample_rate = sf.SoundFile(path).samplerate
    loading_sample_rate = (
        target_sample_rate if file_sample_rate < target_sample_rate else None
    )

    # loading
    i_samples, i_sample_rate = librosa.load(
        path,
        sr=loading_sample_rate,
        res_type="polyphase",
    )

    # source file stft
    i_stft = librosa.stft(
        i_samples,
        n_fft=n_fft,
        hop_length=hop_length,
    )

    i_magnitude = np.abs(i_stft)
    i_phase = np.angle(i_stft)
    i_frequency_bins = librosa.fft_frequencies(sr=i_sample_rate, n_fft=n_fft)

    # Find frequency bin indices within source frequency band
    i_source_band_indices = np.where(
        (i_frequency_bins >= source_freq_low) & (i_frequency_bins <= source_freq_high)
    )[0]

    i_source_band_frequencies = i_frequency_bins[i_source_band_indices]

    # Create target frequency band with same number of bins
    o_target_band_frequencies = np.linspace(
        target_freq_low,
        target_freq_high,
        len(i_source_band_frequencies),
    )

    # Map target frequencies to source band indices via interpolation
    frequency_mapping_coords = np.interp(
        i_frequency_bins,
        o_target_band_frequencies,
        np.arange(len(i_source_band_frequencies)),
        left=-1,
        right=len(i_source_band_frequencies),
    )

    # Extract dimensions and source band magnitude
    num_frequency_bins, num_time_frames = i_magnitude.shape
    i_source_band_magnitude = i_magnitude[i_source_band_indices, :]  # shape: (B, T)

    # Create flattened coordinate grids for interpolation
    frequency_coords_flat = (
        frequency_mapping_coords[:, None].repeat(num_time_frames, axis=1).flatten()
    )

    time_coords_flat = (
        np.arange(num_time_frames)[None, :].repeat(num_frequency_bins, axis=0).flatten()
    )

    interpolation_coords = np.vstack([frequency_coords_flat, time_coords_flat])

    # Perform 2D interpolation on magnitude
    o_magnitude_interpolated_flat = map_coordinates(
        i_source_band_magnitude,
        interpolation_coords,
        order=1,
        mode="constant",
        cval=0.0,
    )

    o_magnitude = o_magnitude_interpolated_flat.reshape(
        num_frequency_bins,
        num_time_frames,
    )

    # Reconstruct complex STFT using interpolated magnitude and original phase
    o_stft = o_magnitude * (np.cos(i_phase) + 1j * np.sin(i_phase))

    # Convert back to time domain
    o_samples_at_input_rate = librosa.istft(o_stft, hop_length=hop_length)

    # Resample to target sample rate
    o_samples = librosa.resample(
        o_samples_at_input_rate,
        orig_sr=i_sample_rate,
        target_sr=target_sample_rate,
    )

    return o_samples
