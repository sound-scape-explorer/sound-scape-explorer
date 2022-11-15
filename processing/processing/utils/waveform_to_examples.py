import numpy
import torch
import torchaudio

from processing.utils.frame import frame


def waveform_to_examples(data, sample_rate, band_params):
    data = data.reshape(-1)
    # Compute log mel spectrogram features.
    ntot, startwin = band_params
    if ntot % 64 > 0:
        raise Exception(f'The band size parameter should be a multiple of 64')
    n_fft = 4096 // 2 * (ntot // 64)  # (4096*3 * 64) //ntot
    log_mel = numpy.log(torchaudio.transforms.MelSpectrogram(
        sample_rate=sample_rate, n_fft=n_fft,
        hop_length=int(1842 / 192000 * sample_rate), n_mels=ntot,
        win_length=n_fft, power=1)(data).detach().numpy() + .1).T
    log_mel = log_mel[:, startwin:startwin + 64]
    # Frame features into examples.
    features_sample_rate = 1.0 / 0.010
    example_window_length = int(round(1 * features_sample_rate))
    example_hop_length = int(round(1 * features_sample_rate))
    log_mel_examples = frame(log_mel, window_length=example_window_length,
                             hop_length=example_hop_length)
    # l = example_window_length
    # log_mel_examples = log_mel[:l*(log_mel.shape[0]//l)].reshape((-1, l, 64))

    log_mel_examples = torch.tensor(log_mel_examples, requires_grad=True)[:,
                       None, :, :].float()
    return log_mel_examples
