import numpy as np

from processing.common.AggregatedTag import AggregatedTag


def sort_dataframe(df: np.ndarray, label: AggregatedTag):
    order = np.argsort(label.uniques_occurrence)
    df = df[:, order]
    df = df[order, :]
    return df
