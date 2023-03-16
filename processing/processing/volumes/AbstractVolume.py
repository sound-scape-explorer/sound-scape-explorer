from abc import ABC, abstractmethod
from typing import List

from processing.storage.Storage import Storage


class AbstractVolume(ABC):
    _band: str
    _integration: int
    _file_index: int
    _values: List[float]

    def __init__(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        self._band = band
        self._integration = integration
        self._file_index = file_index

        self._values = []

    @abstractmethod
    def calculate(
        self,
        features: List[float]
    ) -> None:
        pass

    def store(
        self,
        storage: Storage,
        index: int,
    ) -> None:
        storage.write_volume(
            index=index,
            band=self._band,
            integration=self._integration,
            file_index=self._file_index,
            values=self._values
        )

    def get_values(self) -> List[float]:
        return self._values
