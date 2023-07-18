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
        """The reducer factory.

        Create the corresponding reduction instance.

        Name enumeration:
            ./ReducerName.py

        Args:
            name: The name of reducer.
            target_dimensions: The number of requested dimensions.
            seed: The random seed.
        """

        cls.validate_name(name)

        if name == ReducerName.umap.value:
            return UmapReducer(target_dimensions, seed)
        elif name == ReducerName.vae.value:
            return VaeReducer(target_dimensions)
        elif name == ReducerName.pca.value:
            return PcaReducer(target_dimensions, seed)
        elif name == ReducerName.sparse_pca.value:
            return SparsePcaReducer(target_dimensions, seed)

    @staticmethod
    def validate_name(name: str) -> None:
        """The validator for reducer names.

        Args:
            name: The reducer name to validate.

        Returns:
            None

        Raises:
            KeyError: An error occured because the reducer name has not been found.
        """
        names = set(name.value for name in ReducerName)

        if name in names:
            return

        raise KeyError(f"Reducer {name} not found!")

    @abstractmethod
    def reduce(
        self,
        features: List[List[float]],
    ) -> List[List[float]]:
        """The reducer method to implement in children.

        Args:
            self (Self): The child reducer instance.
            features: The features to reduce. Usually 128 dimensions.

        Returns:
            The reduced features. Usually 2 or 3 dimensions for plotting.
        """
        pass
