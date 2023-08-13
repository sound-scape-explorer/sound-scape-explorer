from typing import List

import numpy as np
from h5py import Dataset
from sklearn import metrics


class MeanDistancesMatrix:
    def calculate(
        self,
        features: List[Dataset],
    ) -> List[List[float]]:
        samples_count = features[0].shape[0]
        mean_distances_matrix = np.zeros([samples_count, samples_count])

        for i in range(len(features)):
            previous_mean_distances_matrix = mean_distances_matrix

            umap = features[i]

            current_mean_distances_matrix = metrics.pairwise_distances(umap)

            mean_distances_matrix = (
                (previous_mean_distances_matrix * i) + current_mean_distances_matrix
            ) / (i + 1)

        self.values = mean_distances_matrix.tolist()
        return self.values
