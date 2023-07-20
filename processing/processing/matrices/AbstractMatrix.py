from abc import ABC, abstractmethod
from typing import List, Union

import pandas as pd
from h5py import Dataset
from pandas import DataFrame

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.storage.Storage import Storage
from processing.utils.convert_dataframe_to_list import convert_dataframe_to_list


class AbstractMatrix(ABC):
    _band: ConfigBand
    _integration: ConfigIntegration
    _matrix_index: int
    _meta_index: int
    _dataframe: DataFrame
    _clusters: List[str]
    _matrix: Union[DataFrame, None]

    def __init__(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
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
        self._clusters = self._dataframe.index.unique()  # type: ignore

        self._matrix = None

    def _set_matrix(
        self,
        matrix: List[List[float]],
    ) -> None:
        payload = pd.DataFrame(matrix, columns=self._clusters, index=self._clusters)

        for i in range(payload.shape[0]):
            for j in range(payload.shape[1]):
                if i < j:
                    payload.iloc[i, j] = None

        self._matrix = payload

    def _iterate_clusters(self):
        for c, cluster in enumerate(self._clusters):
            cluster_frame = self._dataframe[self._dataframe.index == cluster].to_numpy()

            yield c, cluster, cluster_frame

    def __validate_matrix(self):
        if self._matrix is None:
            raise ValueError("Unable to find matrix. Please calculate first.")

        return self._matrix

    def get(self) -> DataFrame:
        matrix = self.__validate_matrix()
        return matrix

    def get_as_list(self) -> List[float]:
        matrix = self.__validate_matrix()
        return convert_dataframe_to_list(matrix)

    def store(
        self,
        storage: Storage,
    ) -> None:
        data = self.get_as_list()

        storage.write_matrix(
            band=self._band,
            integration=self._integration,
            matrix_index=self._matrix_index,
            meta_index=self._meta_index,
            data=data,
        )

    @abstractmethod
    def calculate(self) -> None:
        pass
