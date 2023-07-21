from abc import ABC, abstractmethod
from typing import List, Union

import pandas as pd
from h5py import Dataset
from pandas import DataFrame


class AbstractVolume(ABC):
    _dataframe: Union[DataFrame, None]
    _clusters: Union[List[str], None]
    values: Union[DataFrame, None]

    def __init__(
        self,
    ) -> None:
        self._dataframe = None
        self._clusters = None
        self.values = None

    @abstractmethod
    def calculate(self):
        pass

    def _iterate_clusters(self):
        if self._dataframe is None or self._clusters is None:
            raise RuntimeError(
                "Unable to find dataframe and/or clusters. Please load first."
            )

        for cluster in self._clusters:
            cluster_frame = self._dataframe[self._dataframe.index == cluster].to_numpy()
            yield cluster, cluster_frame

    def _set(
        self,
        data: List[float],
    ) -> None:
        self.values = pd.DataFrame(
            data=data,
            columns=["volume"],
            index=self._clusters,
        )

    def load(
        self,
        features: List[Dataset],
        labels: List[str],
    ) -> DataFrame:
        self._dataframe = pd.DataFrame(features)
        self._dataframe.index = labels
        self._clusters = self._dataframe.index.unique()  # type: ignore
        return self._dataframe
