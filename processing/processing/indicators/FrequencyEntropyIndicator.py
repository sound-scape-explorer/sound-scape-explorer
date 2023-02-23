from typing import List

import maad.features
import numpy

from processing.indicators.AbstractIndicator import AbstractIndicator
from processing.storage.Storage import Storage


class FrequencyEntropyIndicator(AbstractIndicator):
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
        storage.create_group_indicator_frequency_entropy(
            band=self._band,
            integration=self._integration,
            file_index=self._file_index,
            values=self._values,
        )

    def calculate(
        self,
        spectrogram: List[List[float]],
    ) -> None:
        if spectrogram is None:
            self._values.append(numpy.nan)
            return

        frequency_entropy, _ = maad.features.frequency_entropy(spectrogram)

        self._values.append(frequency_entropy)
