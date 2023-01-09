import gzip
import pickle

import numpy

from processing.errors.DataLoaderFeatureFileNotFoundError import \
    DataLoaderFeatureFileNotFoundError


def load_feature_file(npz):
    try:
        data = None

        if npz.exists():
            data = numpy.load(npz)['x']
        else:
            # backward compatibility, try pklz
            with gzip.open(npz.with_suffix(".pklz"), "rb") as f:
                data = pickle.loads(f.read())

        return data
    except FileNotFoundError:
        raise DataLoaderFeatureFileNotFoundError(
            '.npz nor .pklz file could be found'
        )
