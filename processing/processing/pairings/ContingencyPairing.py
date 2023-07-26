from typing import List, Tuple

import numpy
import pandas as pd
from sklearn import metrics

from processing.pairings.AbstractPairing import AbstractPairing


class ContingencyPairing(AbstractPairing):
    def __init__(
        self,
    ) -> None:
        super().__init__()

    def calculate(self) -> Tuple[List[float], List[float]]:
        _, clusters_a, clusters_b = self._validate_load()

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

        pairing_b = (
            contingency_matrix
            / numpy.tile(
                numpy.sum(contingency_matrix, axis=0),  # type: ignore
                (contingency_matrix.shape[0], 1),
            )
            * 100
        )

        payload_a = pd.DataFrame(
            pairing_a.T,
            index=list(numpy.unique(clusters_b)),
            columns=list(numpy.unique(clusters_a)),
        )

        payload_b = pd.DataFrame(
            pairing_b,
            columns=list(numpy.unique(clusters_b)),
            index=list(numpy.unique(clusters_a)),
        )

        self._set(payload_a, payload_b)

        return self.values_a, self.values_b
