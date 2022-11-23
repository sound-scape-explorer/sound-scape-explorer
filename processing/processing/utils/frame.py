import numpy as np
import torch

def frame(data, window_length, hop_length):
    num_samples = data.shape[0]
    num_frames = 1 + int(np.floor((num_samples - window_length) / hop_length))
    shape = (num_frames, window_length) + data.shape[1:]
    strides = (data.stride(0) * hop_length,) + data.stride()
    return torch.as_strided(data, shape, strides)
