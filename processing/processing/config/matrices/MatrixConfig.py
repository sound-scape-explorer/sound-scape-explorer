from typing import Dict, List, Type

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.matrices.AbstractMatrix import AbstractMatrix
from processing.matrices.DistanceMatrix import DistanceMatrix
from processing.matrices.OverlapMatrix import OverlapMatrix
from processing.matrices.SilhouetteMatrix import SilhouetteMatrix


class MatrixConfig:
    algorithms: Dict[str, Type[AbstractMatrix]] = {
        "distance": DistanceMatrix,
        "overlap": OverlapMatrix,
        "silhouette": SilhouetteMatrix,
    }

    index: int
    name: str
    band: BandConfig
    integration: IntegrationConfig
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
        if name in MatrixConfig.algorithms.keys():
            return

        raise KeyError(f"Unable to find matrix name {name}.")

    @staticmethod
    def flatten(matrices: List["MatrixConfig"]):
        names = [m.name for m in matrices]
        return names

    @staticmethod
    def reconstruct(
        names: List[str],
    ) -> List["MatrixConfig"]:
        matrices = []

        for index, name in enumerate(names):
            matrix = MatrixConfig(
                index=index,
                name=name,
            )

            matrices.append(matrix)

        return matrices

    def create_instance(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
        meta_index: int,
    ):
        self.band = band
        self.integration = integration
        self.meta_index = meta_index
        self.instance = self.algorithms[self.name]()
        return self.instance
