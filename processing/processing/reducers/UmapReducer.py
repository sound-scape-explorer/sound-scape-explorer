from typing import List

from sklearn.preprocessing import robust_scale

from processing.reducers.AbstractReducer import AbstractReducer


class UmapReducer(AbstractReducer):
    min_dist: float

    def __init__(
        self,
        min_dist: float = 0.1,
    ):
        self.min_dist = min_dist

    def calculate(
        self,
    ) -> List[List[float]]:
        features = self._validate_load()
        scaled_features = robust_scale(features)

        # using dynamic import to prevent numba's AOT
        from umap.umap_ import UMAP

        umap = UMAP(
            n_components=self._dimensions,
            random_state=self._seed,
            metric="manhattan",
            min_dist=self.min_dist,
        )

        reduced_features = umap.fit_transform(scaled_features)
        self.set_values(list(reduced_features))  # type: ignore
        return self.values
