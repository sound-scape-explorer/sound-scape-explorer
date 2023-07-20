from typing import List

import numpy as np
from h5py import Dataset
from sklearn import metrics

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.matrices.AbstractMatrix import AbstractMatrix


class DistanceMatrix(AbstractMatrix):
    def __init__(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        matrix_index: int,
        meta_index: int,
        features: List[Dataset],
        labels: List[str],
    ) -> None:
        super().__init__(
            band,
            integration,
            matrix_index,
            meta_index,
            features,
            labels,
        )

    def get_centers(self):
        # medioids
        centers = np.empty((len(self._clusters), self._dataframe.shape[1]))

        for c, _, cluster_frame in self._iterate_clusters():
            centers[c, :] = np.nanpercentile(cluster_frame, 50, axis=0)

        return centers

    def calculate(self):
        centers = self.get_centers()
        distance = metrics.pairwise_distances(centers, metric="manhattan")
        self._set_matrix(distance)  # type: ignore
