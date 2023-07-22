from abc import ABC, abstractmethod
from typing import List, Tuple, Union

import pandas as pd
from h5py import Dataset
from pandas import DataFrame


class AbstractPairing(ABC):
    _dataframe: Union[None, DataFrame]

    _clusters_a: Union[None, List[str]]
    """Meta labels A"""

    _clusters_b: Union[None, List[str]]
    """Meta labels B"""

    values_a: List[float]
    """Pairings A vs B"""

    values_b: List[float]
    """Pairings B vs A"""

    def __init__(self) -> None:
        self._dataframe = None
        self._clusters_a = None
        self._clusters_b = None

    @abstractmethod
    def calculate(self) -> None:
        pass

    def _validate_load(self):
        if (
            self._dataframe is None
            or self._clusters_a is None
            or self._clusters_b is None
        ):
            raise RuntimeError("Unable to find data for pairing. Please load first.")

        return self._dataframe, self._clusters_a, self._clusters_b

    def _set(
        self,
        values_a: List[float],
        values_b: List[float],
    ) -> Tuple[List[float], List[float]]:
        self.values_a = values_a
        self.values_b = values_b
        return self.values_a, self.values_b

    def load(
        self,
        features: List[Dataset],
        labels_a: List[str],
        labels_b: List[str],
    ) -> None:
        self._dataframe = pd.DataFrame(features)

        self._clusters_a = list(labels_a)
        self._clusters_b = list(labels_b)
