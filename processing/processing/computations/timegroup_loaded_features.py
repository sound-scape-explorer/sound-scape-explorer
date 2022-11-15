import datetime as dt

import numpy as np


def timegroup_loaded_features(range_times, r, integration):
    range_bins = (range_times - r[0]) // dt.timedelta(seconds=integration)
    group_starts = np.unique(range_bins, return_index=True)[1]
    return range_bins, group_starts
