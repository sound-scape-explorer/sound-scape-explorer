from abc import ABC, abstractmethod
from typing import Any, List, Optional, Tuple

from h5py import Dataset
from numpy import ndarray
from pandas import DataFrame, Index

from processing.config.labels.LabelConfig import LabelConfig

Features = List[List[float]]
Digested = List[Any]


class Digester(ABC):
    index: int
    is_pairing: bool
    __features: Optional[DataFrame] = None
    __labels: Optional[List[LabelConfig]] = None

    @property
    def features(self) -> DataFrame:
        assert self.__features is not None, "Please define features"
        return self.__features

    @features.setter
    def features(self, features: Dataset) -> None:
        self.__features = DataFrame(features)

    @property
    def labels(self) -> List[LabelConfig]:
        assert self.__labels is not None, "Please define labels"
        return self.__labels

    @labels.setter
    def labels(self, labels: List[LabelConfig]) -> None:
        self.__labels = labels

    def get_label_data(self, label: LabelConfig) -> Tuple[DataFrame, Index]:
        df = self.features
        df.index = label.values
        values: Index = df.index.unique()  # type: ignore

        return df, values

    def walk_within_label(self, label: LabelConfig):
        df, values = self.get_label_data(label)

        for index, value in enumerate(values):
            frame: ndarray = df[df.index == value].to_numpy()
            yield index, frame, value

    def walk_labels(self):
        if self.is_pairing:
            for label_a in self.labels:
                for label_b in self.labels:
                    data = self.digest([label_a, label_b])
                    yield data, label_a, label_b
        else:
            for label in self.labels:
                data = self.digest([label])
                yield data, label, None

    @abstractmethod
    def digest(self, labels: List[LabelConfig]) -> Digested:
        pass
