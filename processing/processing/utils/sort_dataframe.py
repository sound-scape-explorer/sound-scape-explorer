import numpy as np
from pandas import DataFrame

from processing.new.FusedLabel import FusedLabel


def sort_dataframe(dataframe: DataFrame, label: FusedLabel) -> DataFrame:
    order = np.argsort(label.uniques_unsorted)
    dataframe = dataframe[:, order]
    dataframe = dataframe[order, :]
    return dataframe
