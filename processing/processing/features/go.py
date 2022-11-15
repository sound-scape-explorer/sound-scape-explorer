import gzip
import pathlib
import pickle
import time

import torch

from processing.models.VGGish import VGGish
from processing.utils.load_data import load_data
from processing.utils.prevent_keyboard_interrupt import PreventKeyboardInterrupt


def go():
    input_path, output_path, band_params, log, t_start, wav_data, sr, next_param = load_data()

    model = VGGish(band_params, device="cpu")
    model.eval()
    log(f'({time.time() - t_start:.3f} sec)... model file loaded')

    resultsFile = []
    i = 0
    batch = int(sr * 100)

    if wav_data.shape[1] % (sr) != 0:
        wav_data = torch.cat((wav_data, torch.zeros(
            (1, int(sr) - int(wav_data.shape[1] % (sr))))), 1)

    while i < wav_data.shape[1]:
        samples = wav_data[:, i:i + batch]
        fts = model.forward(samples, fs=sr).numpy()
        i += batch
        resultsFile.extend([list(f) for f in fts])

    log(f'({time.time() - t_start:.3f} sec)... model applied to all')

    pathlib.Path(output_path).absolute().parent.mkdir(parents=True,
                                                      exist_ok=True)

    with PreventKeyboardInterrupt():
        with gzip.open(output_path, "wb") as f:
            pickle.dump(resultsFile, f)

    # with open(output_path, "wb") as f:
    #    pickle.dump(resultsFile, f)

    log(f'({time.time() - t_start:.3f} sec)... saved to disk')
