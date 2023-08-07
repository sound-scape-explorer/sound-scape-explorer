from typing import Dict, List, Type

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.volumes.AbstractVolume import AbstractVolume
from processing.volumes.MeanSpreadingVolume import MeanSpreadingVolume
from processing.volumes.MeanStandardDeviationVolume import MeanStandardDeviationVolume
from processing.volumes.SumStandardDeviationVolume import SumStandardDeviationVolume
from processing.volumes.SumVarianceVolume import SumVarianceVolume


class ConfigVolume:
    algorithms: Dict[str, Type[AbstractVolume]] = {
        "sum_var": SumVarianceVolume,
        "sum_std": SumStandardDeviationVolume,
        "mean_std": MeanStandardDeviationVolume,
        "mean_spreading": MeanSpreadingVolume,
    }

    index: int
    name: str
    band: BandConfig
    integration: IntegrationConfig
    meta_index: int
    instance: AbstractVolume

    def __init__(
        self,
        index: int,
        name: str,
    ) -> None:
        self.validate_name(name=name)

        self.index = index
        self.name = name

    @staticmethod
    def validate_name(
        name: str,
    ) -> None:
        if name in ConfigVolume.algorithms.keys():
            return

        raise KeyError(f"Unable to find volume name {name}.")

    @staticmethod
    def flatten(
        volumes: List["ConfigVolume"],
    ) -> List[str]:
        names = [v.name for v in volumes]
        return names

    @staticmethod
    def reconstruct(
        names: List[str],
    ) -> List["ConfigVolume"]:
        volumes = []

        for index, name in enumerate(names):
            volume = ConfigVolume(
                index=index,
                name=name,
            )

            volumes.append(volume)

        return volumes

    def create_instance(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
        meta_index: int,
    ) -> AbstractVolume:
        self.band = band
        self.integration = integration
        self.meta_index = meta_index
        self.instance = self.algorithms[self.name]()
        return self.instance
