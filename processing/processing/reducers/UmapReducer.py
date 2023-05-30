from typing import List, Union

from sklearn.preprocessing import robust_scale
from umap.umap_ import UMAP

from processing.reducers.AbstractReducer import AbstractReducer


class UmapReducer(AbstractReducer):
    __instance: UMAP

    def __init__(
        self,
        target_dimensions: int,
        seed: Union[int, None],
        neighbors: int,
        metric: str,
    ):
        self.__instance = UMAP(
            n_components=target_dimensions,
            random_state=seed,
            n_neighbors=neighbors,
            metric=metric,
        )

    def get_instance(self) -> UMAP:
        return self.__instance

    def reduce(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        scaled_features = robust_scale(features)
        reduced_features = self.__instance.fit_transform(scaled_features)
        reduced_features_list = list(reduced_features)
        return reduced_features_list
