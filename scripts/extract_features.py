import pickle
import gzip
import torch
import time
import torchaudio
import numpy as np
import torch.nn as nn
from torch import hub

import time
import sys
import pathlib
import matplotlib.pyplot as plt

def frame(data, window_length, hop_length):
    num_samples = data.shape[0]
    num_frames = 1 + int(np.floor((num_samples - window_length) / hop_length))
    shape = (num_frames, window_length) + data.shape[1:]
    strides = (data.strides[0] * hop_length,) + data.strides
    return np.lib.stride_tricks.as_strided(data, shape=shape, strides=strides)


def waveform_to_examples(data, sample_rate, band_params):
    data = data.reshape(-1)
    # Compute log mel spectrogram features.
    ntot, startwin = band_params
    if ntot % 64 > 0:
        raise Exception(f'The band size parameter should be a multiple of 64')
    n_fft = 4096//2 * (ntot//64)   # (4096*3 * 64) //ntot
    log_mel = np.log(torchaudio.transforms.MelSpectrogram(
       sample_rate=sample_rate, n_fft=n_fft, hop_length=int(1842/192000*sample_rate), n_mels=ntot,
        win_length=n_fft, power=1)(data).detach().numpy() + .1).T
    log_mel = log_mel[:, startwin:startwin+64]
    # Frame features into examples.
    features_sample_rate = 1.0 / 0.010
    example_window_length = int(round(0.96 * features_sample_rate))
    example_hop_length = int(round(0.96 * features_sample_rate))
    log_mel_examples = frame(log_mel, window_length=example_window_length,
                             hop_length=example_hop_length)
    #l = example_window_length
    #log_mel_examples = log_mel[:l*(log_mel.shape[0]//l)].reshape((-1, l, 64))
    
    log_mel_examples = torch.tensor(log_mel_examples, requires_grad=True)[:, None, :, :].float()
    return log_mel_examples


class VGG(nn.Module):
    def __init__(self, features):
        super(VGG, self).__init__()
        self.features = features
        self.embeddings = nn.Sequential(
            nn.Linear(512 * 4 * 6, 4096), nn.ReLU(True),
            nn.Linear(4096, 4096), nn.ReLU(True),
            nn.Linear(4096, 128), nn.ReLU(True))

    def forward(self, x):
        with torch.no_grad():
            x = self.features(x)
            # Transpose the output from features to
            # remain compatible with vggish embeddings
            x = torch.transpose(x, 1, 3)
            x = torch.transpose(x, 1, 2)
            x = x.contiguous()
            x = x.view(x.size(0), -1)
            return self.embeddings(x)


def make_layers():
    layers = []
    in_channels = 1
    for v in [64, "M", 128, "M", 256, 256, "M", 512, 512, "M"]:
        if v == "M":
            layers += [nn.MaxPool2d(kernel_size=2, stride=2)]
        else:
            conv2d = nn.Conv2d(in_channels, v, kernel_size=3, padding=1)
            layers += [conv2d, nn.ReLU(inplace=True)]
            in_channels = v
    return nn.Sequential(*layers)


class VGGish(VGG):
    def __init__(self, band_params, device=None):
        super().__init__(make_layers())
        state_dict = hub.load_state_dict_from_url(
                                  'https://github.com/harritaylor/torchvggish/'
                                  'releases/download/v0.1/vggish-10086976.pth',
                                  progress=True)
        super().load_state_dict(state_dict)
        if device is None:
            device = torch.device('cuda' if torch.cuda.is_available()
                                  else 'cpu')
        self.device = device
        self.to(self.device)
        self.band_params = band_params

    def forward(self, x, fs):
        x = waveform_to_examples(x, fs, self.band_params)
        x = x.to(self.device)
        return VGG.forward(self, x)

def parse_band(p):
    return [int(v) for v in p.split('-')]
    
def load_data():
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    band_params = parse_band(sys.argv[3]) # e.g. 256-64
    expected_sample_rate = int(sys.argv[4])
    next_param = 5
    log = print

    if band_params[0] - band_params[1] < 64:
        raise Exception(f'Band parameters do not allow to extract 64 bins, i.e. {band_params[0]}-{band_params[1]}={band_params[0]-band_params[1]} < 64')
    
    t_start = time.time()
    #log('Starting...')
    wav_data, sr = torchaudio.load(input_path)
    log(f'({time.time() - t_start:.3f} sec)... audio file loaded ({wav_data.shape}, rate {sr}, ~{wav_data.shape[1]/sr}sec)')
    
    if sr != expected_sample_rate:
        raise Exception(f'Expected sample rate of {expected_sample_rate} but got {sr}')

    return input_path, output_path, band_params, log, t_start, wav_data, sr, next_param

def get_audio_duration(audio_path): # in sec
    wav_data, sr = torchaudio.load(audio_path)
    return wav_data.shape[1] / sr

def get_band_freq_bounds(sr, band_params):
    spectro_freq = sr//2
    mel_max = 2595*np.log10(1+spectro_freq/700)
    hz = lambda m: 700*(10**(m/2595) - 1)
    mel_start = band_params[1]/band_params[0] * mel_max
    mel_end = (band_params[1]+64)/band_params[0] * mel_max
    return hz(mel_start), hz(mel_end)

def print_band_freq_bounds(params=sys.argv):
    sr = int(sys.argv[1])
    band_params = parse_band(sys.argv[2])
    hz_range = get_band_freq_bounds(sr, band_params)
    print(hz_range, band_params, *sys.argv[3:])

def preview():
    input_path, output_path, band_params, log, t_start, wav_data, sr, next_param = load_data()
    sub_start = float(sys.argv[next_param])
    sub_dur = float(sys.argv[next_param+1])
    if sr*sub_dur > wav_data.shape[1]:
        raise Exception(f'Not enough audio data ({wav_data.shape[1]} samples) to extract {sr*sub_dur} values for preview)')
    wav_data = wav_data[:,int(sr*sub_start):int(sr*(sub_start+sub_dur))]
    if True:
        min_freq, max_freq = get_band_freq_bounds(sr, band_params)
        log(f'           ... from {min_freq:.1f}Hz to {max_freq:.1f}Hz')
    x = waveform_to_examples(wav_data, sr, band_params)
    log(f'({time.time() - t_start:.3f} sec)... features extracted {x.shape} (from input {wav_data.shape})')
    x = x.detach().numpy()
    pathlib.Path(output_path).absolute().parent.mkdir(parents=True, exist_ok=True)
    plt.imsave(output_path, x.reshape((-1, 64)).T[::-1,:], cmap="viridis")
    log(f'({time.time() - t_start:.3f} sec)... png image saved')

def go():
    input_path, output_path, band_params, log, t_start, wav_data, sr, next_param = load_data()
    
    model = VGGish(band_params, device="cpu")
    model.eval()
    log(f'({time.time() - t_start:.3f} sec)... model file loaded')
    
    resultsFile = []
    i = 0
    batch = int(sr*0.96*100)
    if wav_data.shape[1] % (sr*0.96) != 0:
        wav_data = torch.cat((wav_data, torch.zeros(
                         (1, int(sr*0.96)-int(wav_data.shape[1] % (sr*0.96))))), 1)
    while i < wav_data.shape[1]:
        samples = wav_data[:, i:i+batch]
        fts = model.forward(samples, fs=sr).numpy()
        i += batch
        resultsFile.extend([list(f) for f in fts])
    endFile = time.time()
    log(f'({time.time() - t_start:.3f} sec)... model applied to all')
    
    pathlib.Path(output_path).absolute().parent.mkdir(parents=True, exist_ok=True)
    
    with gzip.open(output_path, "wb") as f:
        pickle.dump(resultsFile, f)
    
    #with open(output_path, "wb") as f:
    #    pickle.dump(resultsFile, f)
    
    log(f'({time.time() - t_start:.3f} sec)... saved to disk')

