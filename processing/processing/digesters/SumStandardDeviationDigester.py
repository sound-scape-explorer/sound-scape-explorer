import numpy as np

from processing.digesters.Digester import Digester


class SumStandardDeviationDigester(Digester):
    def digest(self, labels):
        label = labels[0]
        data = []

        for _, frame, _ in self.walk_within_label(label):
            std = np.std(frame, axis=0)
            sum_std = np.sum(std)
            data.append(float(sum_std))

        return data
