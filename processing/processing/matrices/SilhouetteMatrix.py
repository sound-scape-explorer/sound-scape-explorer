import numpy as np
import pandas as pd
from sklearn import metrics

from processing.matrices.AbstractMatrix import AbstractMatrix


# INFO: This is the only `Indicator` that can be fed with mean distances matrix
class SilhouetteMatrix(AbstractMatrix):
    def __init__(self) -> None:
        super().__init__()

    def calculate(self):
        dataframe, clusters = self._validate_load()

        silhouette = np.zeros((len(clusters), len(clusters)))

        for i, cl1 in enumerate(clusters):
            for j, cl2 in enumerate(clusters):
                if i > j:
                    silhouette[i, j] = metrics.silhouette_score(
                        pd.concat(
                            (
                                dataframe[dataframe.index == cl1],
                                dataframe[dataframe.index == cl2],
                            )
                        ),
                        pd.concat(
                            (
                                pd.Series(dataframe.index[dataframe.index == cl1]),
                                pd.Series(dataframe.index[dataframe.index == cl2]),
                            )
                        ),
                        metric="manhattan",
                    )

        silhouette = silhouette + silhouette.T
        np.fill_diagonal(silhouette, np.nan)

        self._set(list(silhouette))

        return silhouette
