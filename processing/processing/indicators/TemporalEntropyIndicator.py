from typing import List

import maad

from processing.indicators.AbstractIndicator import AbstractIndicator
from processing.storage.Storage import Storage


class TemporalEntropyIndicator(AbstractIndicator):
    def __init__(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        super().__init__(band, integration, file_index)

    def store(
        self,
        storage: Storage,
    ) -> None:
        storage.create_group_indicator_temporal_entropy(
            band=self._band,
            integration=self._integration,
            file_index=self._file_index,
            values=self._values,
        )

    def calculate(
        self,
        sound: List[float],
    ) -> None:
        value = maad.features.temporal_entropy(sound)
        self._values.append(value)
