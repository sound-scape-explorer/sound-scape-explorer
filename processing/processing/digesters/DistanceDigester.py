import numpy as np
from sklearn import metrics

from processing.digesters.Digester import Digester


class DistanceDigester(Digester):
    def get_centers(self):
        dataframe, values = self.get_inputs()

        # medioids
        centers = np.empty((len(values), dataframe.shape[1]))

        for index, _ in enumerate(values):
            centers[index, :] = np.nanpercentile(dataframe, 50, axis=0)

        return centers

    def digest(self):
        centers = self.get_centers()
        distances = metrics.pairwise_distances(centers, metric="manhattan")
        return distances
