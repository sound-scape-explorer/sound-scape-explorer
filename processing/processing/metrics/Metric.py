from abc import ABC, abstractmethod

import numpy as np

from processing.interfaces import MetricData, SerializedTag


class Metric(ABC):
    """
    Abstract base class for all metrics that analyze embeddings with respect to labels.

    A metric computes statistical measures or properties from embeddings based on
    their label assignments, which can be used to evaluate clustering quality,
    data distribution characteristics, or other properties.
    """

    def __init__(
        self,
        embeddings: np.ndarray,
        tags: list[SerializedTag],
    ):
        """
        Initialize the metric with embeddings and labels.

        Args:
            embeddings: Feature vectors for data points
            tags: Label assignments for the data points
        """
        self.embeddings = embeddings
        self.tags = tags

    @abstractmethod
    def run(self) -> MetricData:
        """
        Execute the metric computation.

        Returns:
            A dictionary containing the computed metric values.
            The structure of keys and values depends on the specific metric.
        """
        pass
