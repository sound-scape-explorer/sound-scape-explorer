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

        # we don't need computing both 'a vs b' and 'b vs a' as they are
        # mirrored

        pairing_a = (
            contingency_matrix
            / numpy.tile(
                numpy.sum(contingency_matrix, axis=1),  # type: ignore
                (contingency_matrix.shape[1], 1),
            ).T
            * 100
        )

        payload_a = pd.DataFrame(pairing_a.T)

        return payload_a
