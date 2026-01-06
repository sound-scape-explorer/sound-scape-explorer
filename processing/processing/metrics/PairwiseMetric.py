from abc import abstractmethod

import numpy as np

from processing.interfaces import MetricData, SerializedTag
from processing.metrics.Metric import Metric


class PairwiseMetric(Metric):
    """
    Base class for metrics that compare pairs of labels.

    These metrics analyze relationships between different label assignments,
    such as overlap, correlation, or contingency between clustering results.
    """

    def run(self) -> MetricData:
        results: MetricData = {}

        # Only compute pairs where i < j to avoid redundant calculations
        for i, label_a in enumerate(self.tags):
            for j, label_b in enumerate(self.tags):
                # if i >= j: # Skip when labels are the same or already computed
                #     continue

                # Compute for both directions (a vs b and b vs a)
                key_a_vs_b = (label_a.name, label_b.name)
                key_b_vs_a = (label_b.name, label_a.name)

                # Compute the contingency matrices for both directions
                matrix_a_vs_b, matrix_b_vs_a = self._compute_pair(label_a, label_b)

                results[key_a_vs_b] = matrix_a_vs_b.astype(np.float32)
                results[key_b_vs_a] = matrix_b_vs_a.astype(np.float32)

        return results

    @abstractmethod
    def _compute_pair(
        self,
        tag_a: SerializedTag,
        tag_b: SerializedTag,
    ) -> tuple[np.ndarray, np.ndarray]:
        """
        Internal method to compute the metric between two specific labels.

        Args:
            tag_a: First label to compare
            tag_b: Second label to compare

        Returns:
            The computed metric value for this label pair
        """
        pass
