import numpy as np
from sklearn import metrics

from processing.metrics.PairwiseMetric import PairwiseMetric


class ContingencyMetric(PairwiseMetric):
    """
    Computes contingency matrix between pairs of label assignments.

    This metric measures how clusters in one label assignment correspond to
    clusters in another label assignment, expressed as percentages.
    """

    def _compute_pair(self, tag_a, tag_b):
        clusters_a = tag_a.values
        clusters_b = tag_b.values

        contingency_matrix: np.ndarray = metrics.cluster.contingency_matrix(
            clusters_a,
            clusters_b,
        )  # type: ignore

        row_sums = np.sum(contingency_matrix, axis=1)
        col_sums = np.sum(contingency_matrix, axis=0)

        pairing_a_vs_b = (
            contingency_matrix
            / np.tile(row_sums[:, np.newaxis], (1, contingency_matrix.shape[1]))
            * 100
        )

        pairing_b_vs_a = (
            contingency_matrix.T
            / np.tile(col_sums[:, np.newaxis], (1, contingency_matrix.shape[0]))
            * 100
        )

        return pairing_a_vs_b, pairing_b_vs_a
