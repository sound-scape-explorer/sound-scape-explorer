import numpy

from processing.volumes.AbstractVolume import AbstractVolume


class MeanStandardDeviationVolume(AbstractVolume):
    def __init__(
        self,
    ) -> None:
        super().__init__()

    def calculate(self):
        data = []

        for _, cluster_frame in self._iterate_clusters():
            std = numpy.std(cluster_frame, axis=0)
            mean_std = numpy.mean(std)
            data.append(float(mean_std))

        self._set(data)
