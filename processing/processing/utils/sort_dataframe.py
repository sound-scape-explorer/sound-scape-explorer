import numpy as np
from pandas import DataFrame

from processing.config.labels import LabelConfig


def sort_dataframe(dataframe: DataFrame, label: LabelConfig) -> DataFrame:
    order = np.argsort(label.uniques_unsorted)
    dataframe = dataframe[:, order]
    dataframe = dataframe[order, :]
    return dataframe
