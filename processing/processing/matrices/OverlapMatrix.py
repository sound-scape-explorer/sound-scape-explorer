from typing import List

import numpy as np
from h5py import Dataset

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.matrices.AbstractMatrix import AbstractMatrix


class OverlapMatrix(AbstractMatrix):
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

    def calculate(self):
        nb_clusters = len(self._clusters)

        plus_limits = []
        minus_limits = []

        for cluster in self._clusters:
            plus_limits.append(
                np.nanpercentile(
                    self._dataframe[self._dataframe.index == cluster].to_numpy(),
                    95,
                    axis=0,
                )
            )
            minus_limits.append(
                np.nanpercentile(
                    self._dataframe[self._dataframe.index == cluster].to_numpy(),
                    5,
                    axis=0,
                )
            )

        dataframe_b = np.zeros([nb_clusters, nb_clusters])

        for i, cluster in enumerate(self._clusters):
            dataframe_a = self._dataframe[self._dataframe.index == cluster].to_numpy()

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

        # TODO: Fix typings
        overlap: List[List[float]] = (dataframe_b + dataframe_b.T) / 2  # type: ignore

        self._set_matrix(overlap)
