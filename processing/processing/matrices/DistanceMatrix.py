import numpy as np
from sklearn import metrics

from processing.matrices.AbstractMatrix import AbstractMatrix


class DistanceMatrix(AbstractMatrix):
    def __init__(self) -> None:
        super().__init__()

    def get_centers(self):
        dataframe, clusters = self._validate_load()

        # medioids
        centers = np.empty((len(clusters), dataframe.shape[1]))

        for c, _, cluster_frame in self._iterate_clusters():
            centers[c, :] = np.nanpercentile(cluster_frame, 50, axis=0)

        return centers

    def calculate(
        self,
    ):
        centers = self.get_centers()
        distance = metrics.pairwise_distances(centers, metric="manhattan")
        self._set(list(distance))
        return self.values
