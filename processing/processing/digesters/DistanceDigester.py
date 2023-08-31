import numpy as np
from pandas import DataFrame, Index
from sklearn import metrics

from processing.digesters.Digester import Digester


class DistanceDigester(Digester):
    def get_centers(self, dataframe: DataFrame, values: Index):
        # medioids
        centers = np.empty((len(values), dataframe.shape[1]))

        for index, _ in enumerate(values):
            centers[index, :] = np.nanpercentile(dataframe, 50, axis=0)

        return centers

    def digest(self, labels):
        label = labels[0]
        dataframe, values = self.get_label_data(label)
        centers = self.get_centers(dataframe, values)
        distances = metrics.pairwise_distances(centers, metric="manhattan")
        return distances
