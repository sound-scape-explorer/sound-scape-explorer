import datetime as dt
import gzip
import pickle

import numpy as np

from processing.constants import TIME_DELTA
from processing.utils.iterate_audio_files import iterate_audio_files


def load_features_for(cfg, band, r, s):
    range_times = []
    range_features = []
    for fname, info, audio, npz in iterate_audio_files(cfg, band,
                                                       ['@feature_base',
                                                        '.npz']):
        if info.site != s:
            continue
        if npz.exists():
            data = np.load(npz)['x']
        else:  # backward compatibility, try pklz
            with gzip.open(npz.with_suffix(".pklz"), "rb") as f:
                data = pickle.loads(f.read())
            # TODO: proper error message (saying that npz also not found)

        dur = dt.timedelta(seconds=TIME_DELTA * len(data))
        if r[0] > info.start + dur:
            continue
        if r[1] < info.start:
            continue
        for i in range(len(data)):
            start = info.start + dt.timedelta(seconds=TIME_DELTA * i)
            if start < r[0] or start > r[1]:
                continue
            range_times.append(start)
            range_features.append(data[i])
    ind = np.argsort(range_times)
    range_times = np.array(range_times)[ind]
    range_features = np.array(range_features)[ind]
    return range_times, range_features
