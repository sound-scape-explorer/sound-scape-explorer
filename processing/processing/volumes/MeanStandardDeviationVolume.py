import numpy

from processing.volumes.AbstractVolume import AbstractVolume


class MeanStandardDeviationVolume(AbstractVolume):
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
            std = numpy.std(cluster_frame, axis=0)
            mean_std = numpy.mean(std)
            data.append(float(mean_std))

        self._set(data)
