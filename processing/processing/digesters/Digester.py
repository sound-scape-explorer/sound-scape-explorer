from abc import ABC, abstractmethod
from typing import Any, List, Optional

from h5py import Dataset
from numpy import ndarray
from pandas import DataFrame

from processing.config.labels.LabelConfig import LabelConfig

Features = List[List[float]]
Digested = List[Any]


class Digester(ABC):
    index: int
    __features: Optional[DataFrame] = None
    __label: Optional[LabelConfig] = None

    @property
    def features(self) -> DataFrame:
        assert self.__features is not None, "Please define features"
        return self.__features

    @features.setter
    def features(self, features: Dataset) -> None:
        self.__features = DataFrame(features)

    @property
    def label(self) -> LabelConfig:
        assert self.__label is not None, "Please define label"
        return self.__label

    @label.setter
    def label(self, label: LabelConfig) -> None:
        self.__label = label

    def get_inputs(self):
        df = self.features
        df.index = self.label.values
        values = df.index.unique()  # type: ignore

        return df, values

    def walk(self):
        df, values = self.get_inputs()

        for index, value in enumerate(values):
            frame: ndarray = df[df.index == value].to_numpy()
            yield index, frame, value

    @abstractmethod
    def digest(self) -> Digested:
        pass
