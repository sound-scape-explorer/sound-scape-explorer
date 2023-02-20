from typing import List

import torch
import torchaudio
# from nnAudio import features
from processing.utils.frame import frame


# TODO: Test performance using nnAudio lib instead of torchaudio
def waveform_to_examples(
    data,
    sample_rate,
    frequency_range: List[int],
):
    data = data.reshape(-1)

    mel_total = 64
    mel_start = 0

    f_min, f_max = frequency_range

    n_fft = 4096 // 2

    # TODO: Handle sad cases on bad frequency specifications
    mel_extractor = torchaudio.transforms.MelSpectrogram(
        sample_rate=sample_rate,
        n_fft=n_fft,
        hop_length=int(sample_rate / 100),
        f_min=f_min,
        f_max=f_max,
        n_mels=mel_total,
        win_length=n_fft,
        power=1,
    )
    # mel_extractor = features.mel.MelSpectrogram(
    #     sr=sample_rate, 
    #     n_fft=n_fft, 
    #     win_length=n_fft, 
    #     n_mels=mel_total, 
    #     hop_length=int(sample_rate / 100), 
    #     power=1, 
    #     fmin=f_min, 
    #     fmax=f_max,
    #     verbose=False,
    #     htk=True)

    mel_extractor = mel_extractor.to(data.device)
    log_mel = torch.log(mel_extractor(data) + .1).T
    # log_mel = log_mel.squeeze()
    log_mel = log_mel[:, mel_start:mel_start + 64]

    # Frame features into examples.
    features_sample_rate = 100
    example_window_length = int(round(1 * features_sample_rate))
    example_hop_length = int(round(1 * features_sample_rate))

    log_mel_examples = frame(
        log_mel, window_length=example_window_length,
        hop_length=example_hop_length
    )

    log_mel_examples = log_mel_examples[:, None, :, :].float()

    return log_mel_examples
