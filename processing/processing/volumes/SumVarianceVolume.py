import numpy

from processing.volumes.AbstractVolume import AbstractVolume


class SumVarianceVolume(AbstractVolume):
    def __init__(
        self,
    ) -> None:
        super().__init__()

    def calculate(self):
        data = []

        for _, cluster_frame in self._iterate_clusters():
            var = numpy.var(cluster_frame, axis=0)
            sum_var = numpy.sum(var)
            data.append(float(sum_var))

        self._set(data)
        return self.values
