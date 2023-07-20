from typing import List

import numpy
from h5py import Dataset

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.volumes.AbstractVolume import AbstractVolume


class MeanSpreadingVolume(AbstractVolume):
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
            percentile_95th = numpy.nanpercentile(cluster_frame, 95, axis=0)
            percentile_5th = numpy.nanpercentile(cluster_frame, 5, axis=0)
            mean = numpy.mean(percentile_95th - percentile_5th)
            data.append(float(mean))

        self._set(data)
