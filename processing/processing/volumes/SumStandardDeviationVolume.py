from typing import List

import numpy

from processing.storage.Storage import Storage
from processing.volumes.AbstractVolume import AbstractVolume


class SumStandardDeviationVolume(AbstractVolume):
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
        storage.create_group_volume_sumstd(
            band=self._band,
            integration=self._integration,
            file_index=self._file_index,
            values=self._values
        )

    def calculate(
        self,
        features: List[float],
    ) -> None:
        std = numpy.std(features, axis=0)
        sum_ = numpy.sum(std)
        sumstd = float(sum_)
        self._values.append(sumstd)
