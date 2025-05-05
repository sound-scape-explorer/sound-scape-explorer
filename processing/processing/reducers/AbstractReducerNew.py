from abc import ABC, abstractmethod

import numpy as np
from rich import print

from processing.lib.shapes import assert_shape


class AbstractReducerNew(ABC):
    def reduce(
        self,
        embeddings: np.ndarray,
        dimensions: int,
        seed: int | None,
    ) -> np.ndarray:
        print(
            f"Reducing embeddings of shape {embeddings.shape}"
            f" to {dimensions} dimensions."
        )

        reduced = self._reduce(
            embeddings,
            dimensions,
            seed,
        )

        assert_shape(reduced, (embeddings.shape[0], dimensions))
        return reduced

    @abstractmethod
    def _reduce(
        self,
        embeddings: np.ndarray,
        dimensions: int,
        seed: int | None,
    ) -> np.ndarray:
        pass
