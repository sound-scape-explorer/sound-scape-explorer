from typing import List

import pandas as pd
from h5py import Dataset
from pandas import DataFrame


class ClusterPairing:
    _band: str
    _integration: int
    _matrix_index: int
    _meta_index: int
    _dataframe: DataFrame
    _clusters: List[str]

    def __init__(
        self,
        band: str,
        integration: int,
        matrix_index: int,
        meta_index: int,
        features: List[Dataset],
        labels: List[str],
    ) -> None:
        self._band = band
        self._integration = integration
        self._matrix_index = matrix_index
        self._meta_index = meta_index

        self._dataframe = pd.DataFrame(features)
        self._dataframe.index = labels
        self._clusters = self._dataframe.index.unique()
