from abc import ABC, abstractmethod
from typing import List, Union

import pandas as pd
from h5py import Dataset
from pandas import DataFrame

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.storage.Storage import Storage
from processing.utils.convert_dataframe_to_list import convert_dataframe_to_list


class AbstractVolume(ABC):
    _band: ConfigBand
    _integration: ConfigIntegration
    _volume_index: int
    _meta_index: int
    _dataframe: DataFrame
    _clusters: List[str]
    _volume: Union[DataFrame, None]

    def __init__(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
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
        self._clusters = self._dataframe.index.unique()  # type: ignore

        self._volume = None

    def _iterate_clusters(self):
        for cluster in self._clusters:
            cluster_frame = self._dataframe[self._dataframe.index == cluster].to_numpy()

            yield cluster, cluster_frame

    def store(
        self,
        storage: Storage,
    ) -> None:
        data = self.get_as_list()

        storage.write_volume(
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
            columns=["volume"],
            index=self._clusters,
        )

    def __validate_volume(self):
        if self._volume is None:
            raise ValueError("Unable to find volume. Please calculate first.")

        return self._volume

    def get(self) -> DataFrame:
        volume = self.__validate_volume()
        return volume

    def get_as_list(self) -> List[float]:
        volume = self.__validate_volume()
        return convert_dataframe_to_list(volume)

    @abstractmethod
    def calculate(self):
        pass
