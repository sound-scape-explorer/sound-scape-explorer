from abc import ABC, abstractmethod
from typing import List


class AbstractReducer(ABC):
    @abstractmethod
    def reduce(
        self,
        features: List[List[float]]
    ) -> List[List[float]]:
        pass

    @abstractmethod
    def get_instance(self):
        pass

    def reduce_and_split(
        self,
        features: List[List[float]],
        files_length: int,
    ) -> List[List[List[float]]]:
        reduced_features = self.reduce(features)

        split_features = []

        features_per_file = len(reduced_features) / files_length
        features_per_file = int(features_per_file)

        for _ in range(files_length):
            split_features.append([])

        for file_index in range(files_length):
            start = features_per_file * file_index
            end = features_per_file * (file_index + 1)

            flat_features_slice = reduced_features[start:end]

            for features in flat_features_slice:
                split_features[file_index].append(features)

        return split_features
