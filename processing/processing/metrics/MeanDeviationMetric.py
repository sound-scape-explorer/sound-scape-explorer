from collections import defaultdict

import numpy as np

from processing.interfaces import MetricData
from processing.metrics.Metric import Metric


class MeanDeviationMetric(Metric):
    """Calculates mean standard deviation for classes within each label."""

    def run(self):
        """Calculate the mean standard deviation for each class within each label."""

        results: MetricData = {}

        for tag in self.tags:
            # Create mapping from class value to indices
            class_indices = defaultdict(list)
            for i, class_value in enumerate(tag.values):
                class_indices[class_value].append(i)

            class_results = np.zeros(len(tag.uniques)).astype(np.float32)

            # Process each unique class in the order they first appeared
            for i, class_value in enumerate(tag.uniques):
                # Get indices for this class
                indices = class_indices[class_value]

                # Get embeddings for these indices
                class_embeddings = self.embeddings[indices]

                # Calculate mean standard deviation
                std = np.std(class_embeddings, axis=0)
                mean_std = np.mean(std)

                class_results[i] = mean_std

            results[tag.name] = class_results

        return results
