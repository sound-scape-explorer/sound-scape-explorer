from collections import defaultdict

import numpy as np

from processing.interfaces import MetricData
from processing.metrics.Metric import Metric


class OverlapMetric(Metric):
    """
    Computes overlap between different clusters within each label.

    This metric measures the percentage of dimensions that overlap between
    different clusters, based on the 5th and 95th percentiles of each cluster.
    """

    def run(self):
        results: MetricData = {}

        for tag in self.tags:
            # Create mapping from class value to indices
            class_indices = defaultdict(list)
            for i, class_value in enumerate(tag.values):
                class_indices[class_value].append(i)

            # Get unique class values in order of appearance
            unique_values = tag.uniques
            nb_clusters = len(unique_values)

            # Skip processing if there are no classes or just one class
            if nb_clusters <= 1:
                continue

            # Calculate 5th and 95th percentiles for each cluster
            plus_limits = []
            minus_limits = []

            for class_value in unique_values:
                indices = class_indices[class_value]
                class_embeddings = self.embeddings[indices]

                plus_limits.append(np.nanpercentile(class_embeddings, 95, axis=0))
                minus_limits.append(np.nanpercentile(class_embeddings, 5, axis=0))

            # Compute overlap matrix
            overlap_matrix = np.zeros([nb_clusters, nb_clusters])

            for i, class_value in enumerate(unique_values):
                indices = class_indices[class_value]
                class_embeddings = self.embeddings[indices]

                # Create mask for current cluster's range - using multiplication for element-wise AND
                mask_a = (class_embeddings > minus_limits[i]) * (
                    class_embeddings < plus_limits[i]
                )

                # Identify dimensions to keep (where mask_a has at least one True)
                dim_to_keep = np.where(np.sum(mask_a, axis=0) == 0, np.nan, 1)

                for j, other_value in enumerate(unique_values):
                    # Create the mask for comparing cluster's range
                    mask_b = (class_embeddings > minus_limits[j]) * (
                        class_embeddings < plus_limits[j]
                    )

                    # Calculate average overlap across all dimensions
                    overlap_matrix[i, j] = np.nanmean(
                        np.sum(
                            mask_a * mask_b * dim_to_keep,
                            axis=0,
                        )
                        / np.sum(
                            mask_a,
                            axis=0,
                        )
                    )

            # Make the matrix symmetric by averaging with its transpose
            symmetric_overlap = (overlap_matrix + overlap_matrix.T) / 2

            # Store results
            results[tag.name] = symmetric_overlap.astype(np.float32)

        return results
