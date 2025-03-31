from abc import ABC, abstractmethod
from typing import Union

from h5py import Dataset


class AbstractReducer(ABC):
    _dimensions: int
    _seed: Union[None, int]
    _features: Union[None, Dataset]
    values: list[list[float]]

    def __init__(self):
        self._features = None

    @abstractmethod
    def calculate(self) -> list[list[float]]:
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
        features: list[list[float]],
    ) -> list[list[float]]:
        self.values = features
        return self.values
