from typing import List

import numpy

from processing.storage.Storage import Storage
from processing.volumes.AbstractVolume import AbstractVolume


class MeanSpreadingVolume(AbstractVolume):
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
        storage.create_group_volume_mean_spreading(
            band=self._band,
            integration=self._integration,
            file_index=self._file_index,
            values=self._values
        )

    def calculate(
        self,
        features: List[float],
    ) -> None:
        percentile_95th = numpy.nanpercentile(features, 95, axis=0)
        percentile_5th = numpy.nanpercentile(features, 5, axis=0)
        mean = numpy.mean(percentile_95th - percentile_5th)

        mean_spreading = float(mean)

        self._values.append(mean_spreading)
