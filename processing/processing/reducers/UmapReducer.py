from typing import List

from umap.umap_ import UMAP

from processing.reducers.AbstractReducer import AbstractReducer


class UmapReducer(AbstractReducer):
    __instance: UMAP

    def __init__(
        self,
        target_dimensions: int,
        seed: int,
    ):
        self.__instance = UMAP(
            n_components=target_dimensions,
            random_state=seed,
        )

    def get_instance(self) -> UMAP:
        return self.__instance

    def reduce(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        reduced_features = self.__instance.fit_transform(features)
        return reduced_features
