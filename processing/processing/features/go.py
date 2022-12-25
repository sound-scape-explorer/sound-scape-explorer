import pathlib

import numpy as np
import time
import torch

from processing.classes.DataLoader import DataLoader
from processing.models.VGGish import VGGish
from processing.utils.prevent_keyboard_interrupt import PreventKeyboardInterrupt


def go():
    data_loader = DataLoader()
    input_path, output_path, band_params, t_start, wav_data, sample_rate, \
        next_param = \
        data_loader.get()

    model = VGGish(band_params)
    model.eval()
    print(f'({time.time() - t_start:.3f} sec)... model file loaded')

    payload = []  # results file
    i = 0
    batch = int(sample_rate * 60 * 5)

    if wav_data.shape[1] % sample_rate != 0:
        wav_data = torch.cat(
            (wav_data, torch.zeros(
                (1, int(sample_rate) - int(wav_data.shape[1] % sample_rate))
            )), 1
        )

    while i < wav_data.shape[1]:
        samples = wav_data[:, i:i + batch]

        if model.device == 'cuda':
            fts = model.forward(samples, fs=sample_rate).cpu()
        else:
            fts = model.forward(samples, fs=sample_rate)

        i += batch
        payload.append(fts)

    print(f'({time.time() - t_start:.3f} sec)... model applied to all')

    pathlib.Path(output_path).absolute().parent.mkdir(
        parents=True,
        exist_ok=True
    )

    payload = torch.concat(payload).numpy()

    with PreventKeyboardInterrupt():
        np.savez_compressed(output_path.with_suffix('.npz'), x=payload)

    print(f'({time.time() - t_start:.3f} sec)... saved to disk')
