from collections import defaultdict

import numpy as np
from sklearn import metrics

from processing.interfaces import MetricData, SerializedTag
from processing.metrics.Metric import Metric
from processing.types import Mdm
from processing.utils.sort_dataframe import sort_dataframe


class SilhouetteMetric(Metric):
    def __init__(
        self,
        embeddings: np.ndarray,
        tags: list[SerializedTag],
        mdm: Mdm,
    ):
        super().__init__(embeddings, tags)
        self.mdm = mdm

    def run(self):
        results: MetricData = {}

        for tag in self.tags:
            # Create mapping from class value to indices
            class_indices = defaultdict(list)
            for i, class_value in enumerate(tag.values):
                class_indices[class_value].append(i)

            unique_values = tag.uniques
            n_classes = len(unique_values)
            silhouette = np.zeros((n_classes, n_classes)).astype(np.float32)

            for i, class_a in enumerate(unique_values):
                for j, class_b in enumerate(unique_values):
                    if i > j:  # fill only the lower triangle
                        indices_a = class_indices[class_a]
                        indices_b = class_indices[class_b]

                        n_a = len(indices_a)
                        n_b = len(indices_b)

                        # Skip if either class has too few instances
                        if n_a < 2 or n_b < 2:
                            continue

                        # Create the combined distance matrix for the two classes
                        mdm_comb = np.zeros((n_a + n_b, n_a + n_b)).astype(np.float32)
                        mdm_comb[:n_a, :n_a] = self.mdm[np.ix_(indices_a, indices_a)]
                        mdm_comb[:n_a, n_a:] = self.mdm[np.ix_(indices_a, indices_b)]
                        mdm_comb[n_a:, n_a:] = self.mdm[np.ix_(indices_b, indices_b)]
                        mdm_comb[n_a:, :n_a] = self.mdm[np.ix_(indices_b, indices_a)]

                        # Create combined labels
                        combined_labels = np.hstack(
                            [np.full(n_a, class_a), np.full(n_b, class_b)]
                        )

                        try:
                            # Calculate silhouette score
                            score = metrics.silhouette_score(
                                mdm_comb,
                                combined_labels,
                                metric="precomputed",
                            )
                            silhouette[i, j] = score
                        except ValueError:
                            # Handle case where silhouette calculation fails
                            silhouette[i, j] = np.nan

            # Fill in upper triangle (symmetric matrix)
            silhouette = silhouette + silhouette.T
            # necessary?
            silhouette = sort_dataframe(df=silhouette, tag=tag)
            results[tag.name] = silhouette

        return results
