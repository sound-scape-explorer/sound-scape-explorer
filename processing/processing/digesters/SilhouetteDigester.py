import numpy as np
import pandas as pd
from sklearn import metrics

from processing.digesters.Digester import Digester


# INFO: This is the only `Indicator` that can be fed with mean distances matrix
class SilhouetteDigester(Digester):
    def digest(self):
        dataframe, values = self.get_inputs()

        silhouette = np.zeros((len(values), len(values)))

        for i, v1 in enumerate(values):
            for j, v2 in enumerate(values):
                if i > j:
                    silhouette[i, j] = metrics.silhouette_score(
                        pd.concat(
                            (
                                dataframe[dataframe.index == v1],
                                dataframe[dataframe.index == v2],
                            )
                        ),
                        pd.concat(
                            (
                                pd.Series(dataframe.index[dataframe.index == v1]),
                                pd.Series(dataframe.index[dataframe.index == v2]),
                            )
                        ),
                        metric="manhattan",
                    )

        silhouette = silhouette + silhouette.T
        np.fill_diagonal(silhouette, np.nan)
        silhouette[np.triu_indices(silhouette.shape[0])] = np.nan
        return silhouette
