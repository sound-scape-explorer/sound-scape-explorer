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
    ):
        self.__instance = UMAP(
            n_components=target_dimensions,
            random_state=seed,
        )

    def get_instance(self) -> UMAP:
        return self.__instance

    # TODO: Do we want to inject the scale?
    def reduce(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        scaled_features = robust_scale(features)
        reduced_features = self.__instance.fit_transform(scaled_features)
        return reduced_features
