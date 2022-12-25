import pathlib

import matplotlib.pyplot as pyplot
import sys
import time

from processing.classes.DataLoader import DataLoader
from processing.utils.get_band_freq_bounds import get_band_freq_bounds
from processing.utils.waveform_to_examples import waveform_to_examples


def preview():
    # input_path, output_path, band_params, log, t_start, wav_data, sr, \
    #     next_param = load_data()

    data_loader = DataLoader()
    input_path, output_path, band_params, t_start, wav_data, sr, next_param = \
        data_loader.get()

    sub_start = float(sys.argv[next_param])
    sub_dur = float(sys.argv[next_param + 1])

    if sr * sub_dur > wav_data.shape[1]:
        raise Exception(
            f'Not enough audio data ({wav_data.shape[1]} samples) to extra'
            f'ct {sr * sub_dur} values for preview)'
        )

    wav_data = wav_data[:, int(sr * sub_start):int(sr * (sub_start + sub_dur))]

    if True:
        min_freq, max_freq = get_band_freq_bounds(sr, band_params)
        print(f'           ... from {min_freq:.1f}Hz to {max_freq:.1f}Hz')

    x = waveform_to_examples(wav_data, sr, band_params)

    print(
        f'({time.time() - t_start:.3f} sec)... features extracted {x.shape} ('
        f'from input {wav_data.shape})'
    )

    x = x.detach().numpy()

    pathlib.Path(output_path).absolute().parent.mkdir(
        parents=True,
        exist_ok=True
    )

    pyplot.imsave(output_path, x.reshape((-1, 64)).T[::-1, :], cmap="viridis")

    print(f'({time.time() - t_start:.3f} sec)... png image saved')
