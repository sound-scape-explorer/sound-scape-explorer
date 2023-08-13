from abc import ABC, abstractmethod
from typing import List, Optional

from h5py import Dataset
from pandas import DataFrame

Features = List[List[float]]
Labels = List[str]


class Digester(ABC):
    __features: Optional[DataFrame] = None
    __labels: Optional[Labels] = None

    @property
    def features(self) -> DataFrame:
        assert self.__features is not None, "Please define features"
        return self.__features

    @property
    def labels(self) -> Labels:
        assert self.__labels is not None, "Please define labels"
        return self.__labels

    def load(
        self,
        features: List[Dataset],
        labels: Labels,
    ) -> None:
        self.__features = DataFrame(features)
        self.__features.index = labels
        self.__labels = self.features.index.unique()  # type: ignore

    def walk_labels(self):
        for label in self.labels:
            label_frame = self.features[self.features.index == label].to_numpy()
            yield label, label_frame

    @abstractmethod
    def digest(self):
        pass
