from abc import ABC, abstractmethod
from typing import List

import numpy

from processing.audio.Audio import Audio
from processing.storage.Storage import Storage


class AbstractIndicator(ABC):
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
    def store(
        self,
        storage: Storage,
    ) -> None:
        pass

    @abstractmethod
    def calculate(
        self,
        audio: Audio,
    ) -> None:
        pass

    def add_value(
        self,
        value: float,
    ) -> None:
        self._values.append(value)

    def add_nan(self) -> None:
        self._values.append(numpy.nan)

    def get_values(self) -> List[float]:
        return self._values
