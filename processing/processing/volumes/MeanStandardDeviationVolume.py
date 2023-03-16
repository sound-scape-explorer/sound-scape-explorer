from typing import List

import numpy

from processing.volumes.AbstractVolume import AbstractVolume


class MeanStandardDeviationVolume(AbstractVolume):
    def __init__(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        super().__init__(band, integration, file_index)

    def calculate(
        self,
        features: List[float],
    ) -> None:
        std = numpy.std(features, axis=0)
        mean = numpy.mean(std)
        mean_std = float(mean)
        self._values.append(mean_std)
