import numpy

from processing.volumes.AbstractVolume import AbstractVolume


class MeanSpreadingVolume(AbstractVolume):
    def __init__(self) -> None:
        super().__init__()

    def calculate(self):
        data = []

        for _, cluster_frame in self._iterate_clusters():
            percentile_95th = numpy.nanpercentile(cluster_frame, 95, axis=0)
            percentile_5th = numpy.nanpercentile(cluster_frame, 5, axis=0)
            mean = numpy.mean(percentile_95th - percentile_5th)
            data.append(float(mean))

        self._set(data)
