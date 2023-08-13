import numpy as np

from processing.digesters.Digester import Digester


class SumVarianceDigester(Digester):
    def digest(self):
        data = []

        for _, frame, _, _ in self.walk_labels():
            var = np.var(frame, axis=0)
            sum_var = np.sum(var)
            data.append(float(sum_var))

        return data
