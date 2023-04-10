import numpy as np

from processing.volumes.AbstractVolume import AbstractVolume


class MeanSpreadingVolume(AbstractVolume):
    def __init__(
        self,
        band,
        integration,
        volume_index,
        meta_index,
        features,
        labels
    ) -> None:
        super().__init__(
            band,
            integration,
            volume_index,
            meta_index,
            features,
            labels
        )

    def calculate(self):
        data = []

        for _, cluster_frame in self._iterate_clusters():
            percentile_95th = np.nanpercentile(cluster_frame, 95, axis=0)
            percentile_5th = np.nanpercentile(cluster_frame, 5, axis=0)
            mean = np.mean(percentile_95th - percentile_5th)
            data.append(float(mean))

        self._set(data)
