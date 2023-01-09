import torch
import torchaudio

from processing.utils.frame import frame


# TODO: Test performance using nnAudio lib instead of torchaudio
# TODO: Replace `band_params` values from (mel bands, start) to (fmin, fmax)
def waveform_to_examples(
    data,
    sample_rate,
    band_params,
):
    data = data.reshape(-1)

    # Compute log mel spectrogram features.
    mels_total, mels_start = band_params

    if mels_total % 64 > 0:
        raise Exception(f'The band size parameter should be a multiple of 64')

    n_fft = 4096 // 2 * (mels_total // 64)

    print(n_fft)

    # TODO: Handle sad cases on bad frequency specifications
    mel_extractor = torchaudio.transforms.MelSpectrogram(
        sample_rate=sample_rate,
        n_fft=n_fft,
        hop_length=int(sample_rate / 100),
        # f_min=70,
        # f_max=3000,
        n_mels=mels_total,
        win_length=n_fft,
        power=1,
    )

    mel_extractor = mel_extractor.to(data.device)

    log_mel = torch.log(mel_extractor(data) + .1).T
    log_mel = log_mel[:, mels_start:mels_start + 64]

    # Frame features into examples.
    features_sample_rate = 1.0 / 0.010
    example_window_length = int(round(1 * features_sample_rate))
    example_hop_length = int(round(1 * features_sample_rate))

    log_mel_examples = frame(
        log_mel, window_length=example_window_length,
        hop_length=example_hop_length
    )

    log_mel_examples = log_mel_examples[:, None, :, :].float()

    return log_mel_examples
