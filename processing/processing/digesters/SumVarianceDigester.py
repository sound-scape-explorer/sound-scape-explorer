import numpy as np

from processing.digesters.Digester import Digester


class SumVarianceDigester(Digester):
    def digest(self):
        data = []

        for label, label_frame in self.walk_labels():
            print(type(label), label)
            print(type(label_frame), label_frame)
            var = np.var(label_frame, axis=0)
            sum_var = np.sum(var)
            data.append(float(sum_var))

        return data
