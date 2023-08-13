import numpy as np

from processing.digesters.Digester import Digester


class SumStandardDeviationDigester(Digester):
    def digest(self):
        data = []

        for _, frame, _ in self.walk():
            std = np.std(frame, axis=0)
            sum_std = np.sum(std)
            data.append(float(sum_std))

        return data
