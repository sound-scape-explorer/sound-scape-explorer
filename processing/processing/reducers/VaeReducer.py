from typing import List

from processing.reducers.AbstractReducer import AbstractReducer
from processing.shared.VAE_v1 import VAE


class VaeReducer(AbstractReducer):
    __instance: VAE

    def __init__(
        self,
        target_dimensions: int,
        seed: int,
    ):
        self.__instance = VAE(
            n_components=target_dimensions,
        )

    def get_instance(self) -> VAE:
        return self.__instance

    def reduce(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        self.__instance.fit(features)
        return self.__instance.transform(features)
