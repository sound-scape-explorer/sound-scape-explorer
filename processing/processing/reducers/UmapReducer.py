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
        min_dist: float = 0.1,
    ):
        self.__instance = UMAP(
            n_components=target_dimensions,
            random_state=seed,
            metric="manhattan",
            min_dist=min_dist,
        )

    def get_instance(self) -> UMAP:
        return self.__instance

    def reduce(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        scaled_features = robust_scale(features)

        reduced_features = self.__instance.fit_transform(scaled_features)

        reduced_features_list: List[List[float]] = list(
            reduced_features
        )  # type: ignore

        return reduced_features_list
