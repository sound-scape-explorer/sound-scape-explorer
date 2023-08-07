from typing import Dict, List, Type

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.pairings.AbstractPairing import AbstractPairing
from processing.pairings.ContingencyPairing import ContingencyPairing


class PairingConfig:
    algorithms: Dict[str, Type[AbstractPairing]] = {"contingency": ContingencyPairing}
    index: int
    name: str

    def __init__(
        self,
        index: int,
        name: str,
    ) -> None:
        self._validate_name(name)

        self.index = index
        self.name = name

    @staticmethod
    def _validate_name(name: str) -> None:
        if name in PairingConfig.algorithms.keys():
            return

        raise KeyError("Unable to find pairing name {name}.")

    @staticmethod
    def flatten(pairings: List["PairingConfig"]):
        names = [p.name for p in pairings]

        return names

    @staticmethod
    def reconstruct(names: List[str]) -> List["PairingConfig"]:
        pairings = []

        for index, name in enumerate(names):
            pairing = PairingConfig(
                index=index,
                name=name,
            )

            pairings.append(pairing)

        return pairings

    def create_instance(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
        meta_index_a: int,
        meta_index_b: int,
    ) -> AbstractPairing:
        self.band = band
        self.integration = integration
        self.meta_index_a = meta_index_a
        self.meta_index_b = meta_index_b
        self.instance = self.algorithms[self.name]()
        return self.instance
