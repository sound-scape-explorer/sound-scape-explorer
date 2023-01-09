import datetime

import numpy

from processing.classes.Config import Config
from processing.constants import TIME_DELTA
from processing.utils.iterate_audio_files import iterate_audio_files
from processing.utils.load_feature_file import load_feature_file


def load_features_for(band, range_values, site):
    range_times = []
    range_features = []
    meta_values = None
    cfg = Config().get()

    for filename, info, audio, npz in iterate_audio_files(
            cfg,
            band,
            ['@feature_base', '.npz'],
    ):
        if info.site != site:
            continue

        data = load_feature_file(npz)
        duration = datetime.timedelta(seconds=TIME_DELTA * len(data))

        # Todo: This should be the other way around? Current logic assumes we
        #  get [end, start]
        if range_values[0] > info.start + duration:
            continue

        if range_values[1] < info.start:
            continue

        meta_values = info[3:]

        for i in range(len(data)):
            start = info.start + datetime.timedelta(seconds=TIME_DELTA * i)

            if start < range_values[0] or start > range_values[1]:
                continue

            range_times.append(start)
            range_features.append(data[i])

    ind = numpy.argsort(range_times)
    range_times = numpy.array(range_times)[ind]
    range_features = numpy.array(range_features)[ind]

    return range_times, range_features, meta_values
