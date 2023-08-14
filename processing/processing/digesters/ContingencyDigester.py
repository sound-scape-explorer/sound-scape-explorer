import numpy
import pandas as pd
from sklearn import metrics

from processing.digesters.Digester import Digester


class ContingencyDigester(Digester):
    def digest(self, labels):
        label_a = labels[0]
        label_b = labels[1]

        clusters_a = label_a.values
        clusters_b = label_b.values

        contingency_matrix = metrics.cluster.contingency_matrix(
            clusters_a,
            clusters_b,
        )

        pairing_a = (
            contingency_matrix
            / numpy.tile(
                numpy.sum(contingency_matrix, axis=1),  # type: ignore
                (contingency_matrix.shape[1], 1),
            ).T
            * 100
        )

        payload_a = pd.DataFrame(
            pairing_a.T,
            index=list(numpy.unique(clusters_b)),
            columns=list(numpy.unique(clusters_a)),
        )

        # INFO: We don't need this as it strictly is the transposed matrix of payload_a
        # pairing_b = (
        #     contingency_matrix
        #     / numpy.tile(
        #         numpy.sum(contingency_matrix, axis=0),  # type: ignore
        #         (contingency_matrix.shape[0], 1),
        #     )
        #     * 100
        # )
        #
        # payload_b = pd.DataFrame(
        #     pairing_b,
        #     columns=list(numpy.unique(clusters_b)),
        #     index=list(numpy.unique(clusters_a)),
        # )

        return payload_a
