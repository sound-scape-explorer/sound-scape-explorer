import numpy as np

from processing.volumes.AbstractVolume import AbstractVolume


class SumStandardDeviationVolume(AbstractVolume):
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
            std = np.std(cluster_frame, axis=0)
            sum_std = np.sum(std)
            data.append(float(sum_std))

        self._set(data)
