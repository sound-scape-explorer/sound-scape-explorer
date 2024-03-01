import numpy as np
from processing.utils.sort_dataframe import sort_dataframe
from sklearn import metrics

from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.digesters.Digester import Digester


class SilhouetteDigester(Digester):
    def digest(self, labels):
        label = labels[0]
        dataframe, values = self.get_label_data(label)

        silhouette = np.zeros((len(values), len(values)))

        mdm = MeanDistancesMatrix.read_from_storage(
            storage=self.storage,
            band=self.band,
            integration=self.integration,
            trim_half=True,
        )

        for i, cl1 in enumerate(values):
            for j, cl2 in enumerate(values):
                if i > j:
                    labcl1 = np.where(dataframe.index == cl1)[0]
                    labcl1_len = len(labcl1)
                    labcl2 = np.where(dataframe.index == cl2)[0]
                    labcl2_len = len(labcl2)
                    df2 = np.zeros([labcl1_len + labcl2_len, labcl1_len + labcl2_len])
                    df2[:labcl1_len, :labcl1_len] = mdm[np.ix_(labcl1, labcl1)]
                    df2[:labcl1_len, labcl1_len:] = mdm[np.ix_(labcl1, labcl2)]
                    df2[labcl1_len:, labcl1_len:] = mdm[np.ix_(labcl2, labcl2)]
                    df2[labcl1_len:, :labcl1_len] = mdm[np.ix_(labcl2, labcl1)]
                    silhouette[i, j] = metrics.silhouette_score(
                        df2,
                        np.hstack([dataframe.index[labcl1], dataframe.index[labcl2]]),
                        metric="precomputed",
                    )

        silhouette = silhouette + silhouette.T
        silhouette = sort_dataframe(dataframe=silhouette, label=label)
        return silhouette
