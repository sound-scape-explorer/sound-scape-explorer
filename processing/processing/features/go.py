import pathlib

import numpy as np
import time
import torch

from processing.models.VGGish import VGGish
from processing.utils.load_data import load_data
from processing.utils.prevent_keyboard_interrupt import PreventKeyboardInterrupt


def go():
    input_path, output_path, band_params, log, t_start, wav_data, sr, next_param = load_data()

    model = VGGish(band_params)
    model.eval()
    log(f'({time.time() - t_start:.3f} sec)... model file loaded')

    payload = []  # results file
    i = 0
    batch = int(sr * 60 * 5)

    if wav_data.shape[1] % (sr) != 0:
        wav_data = torch.cat((wav_data, torch.zeros(
            (1, int(sr) - int(wav_data.shape[1] % (sr))))), 1)

    while i < wav_data.shape[1]:
        samples = wav_data[:, i:i + batch]

        if model.device == 'cuda':
            fts = model.forward(samples, fs=sr).cpu()
        else:
            fts = model.forward(samples, fs=sr)

        i += batch
        payload.append(fts)

    log(f'({time.time() - t_start:.3f} sec)... model applied to all')

    pathlib.Path(output_path).absolute().parent.mkdir(parents=True,
                                                      exist_ok=True)

    payload = torch.concat(payload).numpy()

    with PreventKeyboardInterrupt():
        np.savez_compressed(output_path.with_suffix('.npz'), x=payload)

    # with open(output_path, "wb") as f:
    #    pickle.dump(resultsFile, f)

    log(f'({time.time() - t_start:.3f} sec)... saved to disk')
