from abc import ABC, abstractmethod
from typing import List

from processing.storage.Storage import Storage


class AbstractVolume(ABC):
    _storage: Storage
    _band: str
    _integration: int
    _file_index: int
    _values: List[float]

    def __init__(
        self,
        storage: Storage,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        self._storage = storage
        self._band = band
        self._integration = integration
        self._file_index = file_index

        self._values = []

    @abstractmethod
    def store(self) -> None:
        pass

    @abstractmethod
    def calculate(
        self,
        features: List[float]
    ) -> None:
        pass
