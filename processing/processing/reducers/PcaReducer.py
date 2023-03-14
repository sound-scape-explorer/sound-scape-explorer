from typing import List

from sklearn.decomposition import PCA

from processing.reducers.AbstractReducer import AbstractReducer


class PcaReducer(AbstractReducer):
    __instance: PCA

    def __init__(
        self,
        target_dimensions: int,
        seed: int,
    ):
        self.__instance = PCA(
            n_components=target_dimensions,
            random_state=seed,
        )

    def get_instance(self) -> PCA:
        return self.__instance

    def reduce(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        reduced_features = self.__instance.fit_transform(features)
        return reduced_features
