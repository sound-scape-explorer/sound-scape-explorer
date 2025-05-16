import numpy as np
from sklearn.preprocessing import robust_scale

from processing.constants import UMAP_MIN_DIST
from processing.reducers.AbstractReducer import AbstractReducer


class UmapReducer(AbstractReducer):
    def __init__(
        self,
        min_dist: float = UMAP_MIN_DIST,
    ):
        self.min_dist = min_dist

    def _reduce(
        self,
        embeddings,
        dimensions,
        seed,
    ):
        # using dynamic import to prevent numba's AOT
        from umap import UMAP

        umap = UMAP(
            n_components=dimensions,
            random_state=seed,
            metric="manhattan",
            min_dist=self.min_dist,
        )

        scaled = robust_scale(embeddings)
        reductions: np.ndarray = umap.fit_transform(scaled)  # type: ignore
        return reductions
