from abc import abstractmethod
from typing import List

from h5py import Dataset

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.pairings.ContingencyPairing import ContingencyPairing
from processing.pairings.PairingName import PairingName
from processing.storage.Storage import Storage


class Pairing:
    def __new__(
        cls,
        name: str,
        band: ConfigBand,
        integration: ConfigIntegration,
        pairing_index: int,
        features: List[Dataset],
        meta_index_a: int,
        meta_index_b: int,
        labels_a: List[str],
        labels_b: List[str],
    ):
        if name == PairingName.contingency.value:
            return ContingencyPairing(
                band=band,
                integration=integration,
                pairing_index=pairing_index,
                features=features,
                meta_index_a=meta_index_a,
                meta_index_b=meta_index_b,
                labels_a=labels_a,
                labels_b=labels_b,
            )
        else:
            cls.fail(name)

    @staticmethod
    def fail(name: str) -> None:
        raise KeyError(f"Unable to find pairing name {name}.")

    @staticmethod
    def validate_name(name: str) -> None:
        names = set(name.value for name in PairingName)

        if name in names:
            return

        Pairing.fail(name)

    @abstractmethod
    def calculate(self) -> None:
        pass

    @abstractmethod
    def store(self, storage: Storage) -> None:
        pass
