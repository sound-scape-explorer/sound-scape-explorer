from abc import abstractmethod
from typing import List

from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.ReducerName import ReducerName
from processing.reducers.SparsePcaReducer import SparsePcaReducer
from processing.reducers.UmapReducer import UmapReducer
from processing.reducers.VaeReducer import VaeReducer


class Reducer:
    def __new__(
        cls,
        name: str,
        target_dimensions: int,
        seed: int,
    ):
        if name == ReducerName.umap.value:
            return UmapReducer(target_dimensions, seed)
        elif name == ReducerName.vae.value:
            return VaeReducer(target_dimensions)
        elif name == ReducerName.pca.value:
            return PcaReducer(target_dimensions, seed)
        elif name == ReducerName.sparse_pca.value:
            return SparsePcaReducer(target_dimensions, seed)
        else:
            cls.fail(name)

    @staticmethod
    def fail(name: str) -> None:
        raise KeyError(f"Reducer {name} not found!")

    @staticmethod
    def validate_name(name: str) -> None:
        names = set(name.value for name in ReducerName)

        if name in names:
            return

        Reducer.fail(name)

    @abstractmethod
    def reduce(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        pass
