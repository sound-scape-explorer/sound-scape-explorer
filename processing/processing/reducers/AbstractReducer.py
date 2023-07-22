from abc import ABC, abstractmethod
from typing import List, Union

from h5py import Dataset


class AbstractReducer(ABC):
    _dimensions: int
    _seed: Union[None, int]
    _features: Union[None, Dataset]
    values: List[List[float]]

    def __init__(
        self,
    ) -> None:
        self._features = None

    @abstractmethod
    def calculate(self) -> List[List[float]]:
        pass

    def _validate_load(self) -> Dataset:
        if self._features is None:
            raise RuntimeError("Unable to find data for reducer. Please load first.")

        return self._features

    def load(
        self,
        dimensions: int,
        seed: Union[None, int],
        features: Dataset,
    ):
        self._dimensions = dimensions
        self._seed = seed
        self._features = features

    def set_values(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        self.values = features
        return self.values
