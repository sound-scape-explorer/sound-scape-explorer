from typing import List

import numpy as np
import pandas as pd
from h5py import Dataset
from sklearn import metrics

from processing.matrices.AbstractMatrix import AbstractMatrix


class SilhouetteMatrix(AbstractMatrix):
    def __init__(
        self,
        band: str,
        integration: int,
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
        silhouette = np.zeros(
            (
                len(self._clusters),
                len(self._clusters),
            )
        )

        for i, cl1 in enumerate(self._clusters):
            for j, cl2 in enumerate(self._clusters):
                if i > j:
                    silhouette[i, j] = metrics.silhouette_score(
                        pd.concat(
                            (
                                self._dataframe[self._dataframe.index == cl1],
                                self._dataframe[self._dataframe.index == cl2],
                            )
                        ),
                        pd.concat(
                            (
                                pd.Series(
                                    self._dataframe.index[self._dataframe.index == cl1]
                                ),
                                pd.Series(
                                    self._dataframe.index[self._dataframe.index == cl2]
                                ),
                            )
                        ),
                        metric="manhattan",
                    )

        silhouette = silhouette + silhouette.T
        np.fill_diagonal(silhouette, np.nan)

        self._set_matrix(silhouette)  # type: ignore
