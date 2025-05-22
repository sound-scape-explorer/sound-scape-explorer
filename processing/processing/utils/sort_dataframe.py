import numpy as np

from processing.interfaces import SerializedTag


def sort_dataframe(df: np.ndarray, tag: SerializedTag):
    order = np.argsort(tag.uniques)
    df = df[:, order]
    df = df[order, :]
    return df
