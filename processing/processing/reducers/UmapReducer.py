from typing import List

import umap.umap_

from processing.reducers.AbstractReducer import AbstractReducer


# noinspection PyProtectedMember


class UmapReducer(AbstractReducer):
    __seed: int
    __target_dimensions: int

    def __init__(
        self,
        target_dimensions: int,
        seed: int,
    ):
        self.__target_dimensions = target_dimensions
        self.__seed = seed

    def reduce(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        umap_instance = umap.umap_.UMAP(
            random_state=self.__seed,
            n_components=self.__target_dimensions,
        )

        reduced_features = umap_instance.fit_transform(features)

        return reduced_features
