from abc import abstractmethod
from typing import List

from h5py import Dataset

from processing.matrices.DistanceMatrix import DistanceMatrix
from processing.matrices.MatrixName import MatrixName
from processing.matrices.OverlapMatrix import OverlapMatrix
from processing.matrices.SilhouetteMatrix import SilhouetteMatrix
from processing.storage.Storage import Storage


class Matrix:
    def __new__(
        cls,
        name: str,
        band: str,
        integration: int,
        matrix_index: int,
        meta_index: int,
        features: List[Dataset],
        labels: List[str],
    ):
        if name == MatrixName.distance.value:
            return DistanceMatrix(
                band=band,
                integration=integration,
                matrix_index=matrix_index,
                meta_index=meta_index,
                features=features,
                labels=labels,
            )
        elif name == MatrixName.overlap.value:
            return OverlapMatrix(
                band=band,
                integration=integration,
                matrix_index=matrix_index,
                meta_index=meta_index,
                features=features,
                labels=labels,
            )
        elif name == MatrixName.silhouette.value:
            return SilhouetteMatrix(
                band=band,
                integration=integration,
                matrix_index=matrix_index,
                meta_index=meta_index,
                features=features,
                labels=labels,
            )
        else:
            cls.fail(name)

    @staticmethod
    def fail(name: str) -> None:
        raise KeyError(f"Matrix {name} not found.")

    @staticmethod
    def validate_name(name: str) -> None:
        names = set(name.value for name in MatrixName)

        if name in names:
            return

        Matrix.fail(name)

    @abstractmethod
    def calculate() -> None:
        pass

    @abstractmethod
    def store(
        self,
        storage: Storage,
    ) -> None:
        pass
