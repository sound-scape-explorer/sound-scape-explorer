from abc import ABC, abstractmethod
from typing import List, Tuple, Union

import pandas as pd
from h5py import Dataset
from pandas import DataFrame

from processing.utils.convert_dataframe_to_list import convert_dataframe_to_list


class AbstractMatrix(ABC):
    _clusters: Union[List[str], None]
    _dataframe: Union[DataFrame, None]
    values: Union[List[float], None]

    def __init__(
        self,
    ) -> None:
        self._clusters = None
        self._dataframe = None
        self.values = None

    @abstractmethod
    def calculate(self) -> None:
        pass

    def _validate_load(self) -> Tuple[DataFrame, List[str]]:
        if self._clusters is None or self._dataframe is None:
            raise RuntimeError(
                "Unable to find dataframe and/or clusters. Please load first."
            )

        return self._dataframe, self._clusters

    def _iterate_clusters(self):
        dataframe, clusters = self._validate_load()

        for c, cluster in enumerate(clusters):
            cluster_frame = dataframe[dataframe.index == cluster].to_numpy()
            yield c, cluster, cluster_frame

    def _set(
        self,
        matrix: List[List[float]],
    ) -> None:
        payload = pd.DataFrame(matrix, columns=self._clusters, index=self._clusters)

        for i in range(payload.shape[0]):
            for j in range(payload.shape[1]):
                if i < j:
                    payload.iloc[i, j] = None

        payload_list = convert_dataframe_to_list(payload)
        self.values = payload_list

    def load(
        self,
        features: Dataset,
        labels: List[str],
    ) -> DataFrame:
        self._dataframe = pd.DataFrame(features)
        self._dataframe.index = labels
        self._clusters = self._dataframe.index.unique()  # type: ignore
        return self._dataframe
