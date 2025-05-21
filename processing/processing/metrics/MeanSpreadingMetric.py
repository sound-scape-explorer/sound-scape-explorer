from collections import defaultdict

import numpy as np

from processing.interfaces import MetricData
from processing.metrics.Metric import Metric


class MeanSpreadingMetric(Metric):
    def run(self):
        results: MetricData = {}

        for tag in self.tags:
            class_indices = defaultdict(list)
            for i, class_value in enumerate(tag.values):
                class_indices[class_value].append(i)

            class_results = np.zeros(len(tag.uniques)).astype(np.float32)

            for i, class_value in enumerate(tag.uniques):
                indices = class_indices[class_value]
                class_embeddings = self.embeddings[indices]

                percentile_95 = np.nanpercentile(class_embeddings, 95, axis=0)
                percentile_5 = np.nanpercentile(class_embeddings, 5, axis=0)
                mean_spread = np.mean(percentile_95 - percentile_5)

                class_results[i] = mean_spread

            results[tag.name] = class_results

        return results
