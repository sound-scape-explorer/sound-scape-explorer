from typing import Dict, List, Type

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.matrices.AbstractMatrix import AbstractMatrix
from processing.matrices.DistanceMatrix import DistanceMatrix
from processing.matrices.OverlapMatrix import OverlapMatrix
from processing.matrices.SilhouetteMatrix import SilhouetteMatrix


class ConfigMatrix:
    algorithms: Dict[str, Type[AbstractMatrix]] = {
        "distance": DistanceMatrix,
        "overlap": OverlapMatrix,
        "silhouette": SilhouetteMatrix,
    }

    index: int
    name: str
    band: ConfigBand
    integration: ConfigIntegration
    meta_index: int
    instance: AbstractMatrix

    def __init__(
        self,
        index: int,
        name: str,
    ) -> None:
        self.validate_name(name)

        self.index = index
        self.name = name

    @staticmethod
    def validate_name(name: str) -> None:
        if name in ConfigMatrix.algorithms.keys():
            return

        raise KeyError(f"Unable to find matrix name {name}.")

    @staticmethod
    def flatten(matrices: List["ConfigMatrix"]):
        names = [m.name for m in matrices]
        return names

    @staticmethod
    def reconstruct(
        names: List[str],
    ) -> List["ConfigMatrix"]:
        matrices = []

        for index, name in enumerate(names):
            matrix = ConfigMatrix(
                index=index,
                name=name,
            )

            matrices.append(matrix)

        return matrices

    def create_instance(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        meta_index: int,
    ):
        self.band = band
        self.integration = integration
        self.meta_index = meta_index
        self.instance = self.algorithms[self.name]()
        return self.instance
