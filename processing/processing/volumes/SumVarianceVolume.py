from typing import List

import numpy

from processing.storage.Storage import Storage
from processing.volumes.AbstractVolume import AbstractVolume


class SumVarianceVolume(AbstractVolume):
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
        storage.create_group_volume_sum_var(
            band=self._band,
            integration=self._integration,
            file_index=self._file_index,
            values=self._values
        )

    def calculate(
        self,
        features: List[float],
    ) -> None:
        var = numpy.var(features, axis=0)
        sum_ = numpy.sum(var)
        sumvar = float(sum_)
        self._values.append(sumvar)
