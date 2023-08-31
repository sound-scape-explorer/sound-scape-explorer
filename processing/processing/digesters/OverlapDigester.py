from typing import List

import numpy as np

from processing.digesters.Digester import Digester


class OverlapDigester(Digester):
    def digest(self, labels):
        label = labels[0]
        dataframe, values = self.get_label_data(label)

        nb_clusters = len(values)

        plus_limits = []
        minus_limits = []

        for value in values:
            plus_limits.append(
                np.nanpercentile(
                    dataframe[dataframe.index == value].to_numpy(),
                    95,
                    axis=0,
                )
            )
            minus_limits.append(
                np.nanpercentile(
                    dataframe[dataframe.index == value].to_numpy(),
                    5,
                    axis=0,
                )
            )

        dataframe_b = np.zeros([nb_clusters, nb_clusters])

        for i, value in enumerate(values):
            dataframe_a = dataframe[dataframe.index == value].to_numpy()

            mask_a = (dataframe_a > minus_limits[i]) * (dataframe_a < plus_limits[i])

            dim_to_keep = np.where(np.sum(mask_a, axis=0) == 0, np.nan, 1)

            for j in range(nb_clusters):
                mask_b = (dataframe_a > minus_limits[j]) * (
                    dataframe_a < plus_limits[j]
                )

                dataframe_b[i, j] = np.nanmean(
                    np.sum(mask_a * mask_b * dim_to_keep, axis=0)
                    / np.sum(mask_a, axis=0)
                )

        overlaps: List[List[float]] = list((dataframe_b + dataframe_b.T) / 2)

        return overlaps
