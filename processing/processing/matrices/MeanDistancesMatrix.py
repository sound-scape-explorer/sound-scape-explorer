from typing import List

import numpy as np
from h5py import Dataset
from sklearn import metrics


class MeanDistancesMatrix:
    __umaps: List[Dataset]
    __matrix: List[List[float]]

    def __init__(
        self,
        umaps: List[Dataset],
    ) -> None:
        self.__umaps = umaps
        self.__samples_count = umaps[0].shape[0]

    def calculate(self) -> List[List[float]]:
        mean_distances_matrix = np.zeros([self.__samples_count, self.__samples_count])

        for i in range(len(self.__umaps)):
            previous_mean_distances_matrix = mean_distances_matrix

            umap = self.__umaps[i]

            current_meann_distances_matrix = metrics.pairwise_distances(umap)

            mean_distances_matrix = (
                (previous_mean_distances_matrix * i) + current_meann_distances_matrix
            ) / (i + 1)

        self.__matrix: List[List[float]] = mean_distances_matrix.tolist()

        return self.__matrix
