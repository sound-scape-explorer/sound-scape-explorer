from typing import List

import numpy
from h5py import Dataset

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.volumes.AbstractVolume import AbstractVolume


class SumVarianceVolume(AbstractVolume):
    def __init__(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        volume_index: int,
        meta_index: int,
        features: List[Dataset],
        labels: List[str],
    ) -> None:
        super().__init__(band, integration, volume_index, meta_index, features, labels)

    def calculate(self):
        data = []

        for _, cluster_frame in self._iterate_clusters():
            var = numpy.var(cluster_frame, axis=0)
            sum_var = numpy.sum(var)
            data.append(float(sum_var))

        self._set(data)
