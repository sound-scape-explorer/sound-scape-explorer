from typing import List

import numpy as np

from processing.matrices.AbstractMatrix import AbstractMatrix


class OverlapMatrix(AbstractMatrix):
    def __init__(self) -> None:
        super().__init__()

    def calculate(self):
        dataframe, clusters = self._validate_load()

        nb_clusters = len(clusters)

        plus_limits = []
        minus_limits = []

        for cluster in clusters:
            plus_limits.append(
                np.nanpercentile(
                    dataframe[dataframe.index == cluster].to_numpy(),
                    95,
                    axis=0,
                )
            )
            minus_limits.append(
                np.nanpercentile(
                    dataframe[dataframe.index == cluster].to_numpy(),
                    5,
                    axis=0,
                )
            )

        dataframe_b = np.zeros([nb_clusters, nb_clusters])

        for i, cluster in enumerate(clusters):
            dataframe_a = dataframe[dataframe.index == cluster].to_numpy()

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

        overlap: List[List[float]] = list((dataframe_b + dataframe_b.T) / 2)

        self._set(overlap)

        return overlap
