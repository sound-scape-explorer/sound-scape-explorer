from typing import List, Union

import maad
import math

from processing.indicators.AbstractIndicator import AbstractIndicator
from processing.storage.Storage import Storage


class MaadLeqIndicator(AbstractIndicator):
    def __init__(
        self,
        storage: Storage,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        super().__init__(storage, band, integration, file_index)

    def store(self) -> None:
        self._storage.create_group_indicator_maad_leq(
            band=self._band,
            integration=self._integration,
            file_index=self._file_index,
            values=self._values,
        )

    def __sanitize(self, value: float) -> Union[float, None]:
        if math.isnan(value):
            value = None

        return value

    def calculate(
        self,
        sound: List[float],
        sample_rate: int,
    ) -> None:
        value = maad.features.temporal_leq(
            sound,
            sample_rate,
            gain=42,
        )

        value = self.__sanitize(value)

        self._values.append(value)
