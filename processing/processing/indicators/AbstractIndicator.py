from abc import ABC, abstractmethod
from typing import List

import numpy

from processing.audio.Audio import Audio
from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.storage.Storage import Storage


class AbstractIndicator(ABC):
    _band: ConfigBand
    _integration: ConfigIntegration
    _file_index: int
    _values: List[float]

    def __init__(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> None:
        self._band = band
        self._integration = integration

        self._values = []

    @abstractmethod
    def calculate(
        self,
        audio: Audio,
    ) -> None:
        pass

    def store(
        self,
        storage: Storage,
        index: int,
    ) -> None:
        storage.write_indicator(
            indicator_index=index,
            band=self._band,
            integration=self._integration,
            values=self._values,
        )

    def add_value(
        self,
        value: float,
    ) -> None:
        self._values.append(value)

    def add_nan(self) -> None:
        self._values.append(numpy.nan)

    def get_values(self) -> List[float]:
        return self._values
