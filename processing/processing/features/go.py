import gzip
import pathlib
import pickle

import time
import torch
import numpy as np

from processing.models.VGGish import VGGish
from processing.utils.get_device import get_device
from processing.utils.load_data import load_data
from processing.utils.prevent_keyboard_interrupt import PreventKeyboardInterrupt


def go():
    input_path, output_path, band_params, log, t_start, wav_data, sr, next_param = load_data()

    device = get_device()

    model = VGGish(band_params, device)
    model.eval()
    log(f'({time.time() - t_start:.3f} sec)... model file loaded')

    resultsFile = []
    i = 0
    batch = int(sr * 60 * 5)

    if wav_data.shape[1] % (sr) != 0:
        wav_data = torch.cat((wav_data, torch.zeros(
            (1, int(sr) - int(wav_data.shape[1] % (sr))))), 1)

    while i < wav_data.shape[1]:
        samples = wav_data[:, i:i + batch]

        if device == 'cuda':
            fts = model.forward(samples, fs=sr).cpu()
        else:
            fts = model.forward(samples, fs=sr)

        i += batch
        resultsFile.append(fts)

    log(f'({time.time() - t_start:.3f} sec)... model applied to all')

    pathlib.Path(output_path).absolute().parent.mkdir(parents=True,
                                                      exist_ok=True)

    resultsFile = torch.concat(resultsFile).numpy()

    with PreventKeyboardInterrupt():
        np.savez_compressed(output_path.with_suffix('.npz'), x=resultsFile)

    # with open(output_path, "wb") as f:
    #    pickle.dump(resultsFile, f)

    log(f'({time.time() - t_start:.3f} sec)... saved to disk')
