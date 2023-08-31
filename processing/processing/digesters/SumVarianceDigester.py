import numpy as np

from processing.digesters.Digester import Digester


class SumVarianceDigester(Digester):
    def digest(self, labels):
        label = labels[0]
        data = []

        for _, frame, _ in self.walk_within_label(label):
            var = np.var(frame, axis=0)
            sum_var = np.sum(var)
            data.append(float(sum_var))

        return data
