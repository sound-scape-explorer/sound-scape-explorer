from typing import List, Union

import numpy
import pandas as pd
from h5py import Dataset
from pandas import DataFrame
from sklearn import metrics

from processing.storage.Storage import Storage
from processing.utils.convert_dataframe_to_list import convert_dataframe_to_list
from processing.volumes.AbstractVolume import AbstractVolume


class ClusterPairing:
    _band: str
    _integration: int
    _pairing_index: int
    _meta_index_a: int
    _meta_index_b: int
    _dataframe: DataFrame
    _clusters_a: List[str]
    _clusters_b: List[str]
    _pairing_a: Union[DataFrame, None]  # a vs b
    _pairing_b: Union[DataFrame, None]  # b vs a

    def __init__(
        self,
        band: str,
        integration: int,
        pairing_index: int,
        features: List[Dataset],
        meta_index_a: int,
        meta_index_b: int,
        labels_a: List[str],
        labels_b: List[str],
    ) -> None:
        self._band = band
        self._integration = integration
        self._pairing_index = pairing_index
        self._meta_index_a = meta_index_a
        self._meta_index_b = meta_index_b

        self._dataframe = pd.DataFrame(features)

        self._clusters_a = list(labels_a)
        self._clusters_b = list(labels_b)

    def _set(
        self,
        pairing_a,
        pairing_b,
    ) -> None:
        self._pairing_a = pairing_a
        self._pairing_b = pairing_b

    def get(self):
        return self._pairing_a, self._pairing_b

    def get_as_list(self):
        if self._pairing_a is None or self._pairing_b is None:
            return [], []

        pairing_a = convert_dataframe_to_list(self._pairing_a)
        pairing_b = convert_dataframe_to_list(self._pairing_b)

        return pairing_a, pairing_b

    def store(
        self,
        storage: Storage,
    ) -> None:
        data = self.get_as_list()

        storage.write_pairing(
            band=self._band,
            integration=self._integration,
            pairing_index=self._pairing_index,
            meta_index_a=self._meta_index_a,
            meta_index_b=self._meta_index_b,
            data=data,
        )

    def calculate(self):
        contingency_matrix = metrics.cluster.contingency_matrix(
            self._clusters_a,
            self._clusters_b,
        )

        pairing_a = (
            contingency_matrix
            / numpy.tile(
                numpy.sum(contingency_matrix, axis=1),  # type: ignore
                (contingency_matrix.shape[1], 1),
            ).T
            * 100
        )

        pairing_b = (
            contingency_matrix
            / numpy.tile(
                numpy.sum(contingency_matrix, axis=0),  # type: ignore
                (contingency_matrix.shape[0], 1),
            )
            * 100
        )

        payload_a = pd.DataFrame(
            pairing_a.T,
            index=list(numpy.unique(self._clusters_b)),
            columns=list(numpy.unique(self._clusters_a)),
        )

        payload_b = pd.DataFrame(
            pairing_b,
            columns=list(numpy.unique(self._clusters_b)),
            index=list(numpy.unique(self._clusters_a)),
        )

        self._set(payload_a, payload_b)
