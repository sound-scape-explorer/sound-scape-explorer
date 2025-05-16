from abc import ABC, abstractmethod

import numpy as np
from rich import print

from processing.lib.shapes import assert_shape


class AbstractReducer(ABC):
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

        reductions = self._reduce(
            embeddings,
            dimensions,
            seed,
        )

        assert_shape(reductions, (embeddings.shape[0], dimensions))
        return reductions

    @abstractmethod
    def _reduce(
        self,
        embeddings: np.ndarray,
        dimensions: int,
        seed: int | None,
    ) -> np.ndarray:
        pass
