from abc import ABC, abstractmethod
from typing import List, Union

import pandas as pd
from h5py import Dataset
from pandas import DataFrame

from processing.storage.Storage import Storage


class AbstractVolume(ABC):
    _band: str
    _integration: int
    _volume_index: int
    _meta_index: int
    _dataframe: DataFrame
    _clusters: List[str]
    _volume: Union[DataFrame, None]

    def __init__(
        self,
        band: str,
        integration: int,
        volume_index: int,
        meta_index: int,
        features: List[Dataset],
        labels: List[str],
    ) -> None:
        self._band = band
        self._integration = integration
        self._volume_index = volume_index
        self._meta_index = meta_index

        self._dataframe = pd.DataFrame(features)
        self._dataframe.index = labels
        self._clusters = self._dataframe.index.unique()

        self._volume = None

    def _iterate_clusters(self):
        for cluster in self._clusters:
            cluster_frame = self._dataframe[
                self._dataframe.index == cluster
                ].to_numpy()

            yield cluster, cluster_frame

    @staticmethod
    def convert_dataframe_to_list(
        df: DataFrame,
    ) -> List[float]:
        return list(df.to_numpy().flatten())

    def store(
        self,
        storage: Storage,
    ) -> None:
        data = self.get_as_list()

        storage.write_volume_new(
            band=self._band,
            integration=self._integration,
            volume_index=self._volume_index,
            meta_index=self._meta_index,
            data=data,
        )

    def _set(
        self,
        data: List[float],
    ) -> None:
        self._volume = pd.DataFrame(
            data=data,
            columns=['volume'],
            index=self._clusters,
        )

    def get(self) -> DataFrame:
        return self._volume

    def get_as_list(self) -> List[float]:
        return self.convert_dataframe_to_list(self._volume)

    @abstractmethod
    def calculate(self):
        pass
