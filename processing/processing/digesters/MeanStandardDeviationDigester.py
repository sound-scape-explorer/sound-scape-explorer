import numpy as np

from processing.digesters.Digester import Digester


class MeanStandardDeviationDigester(Digester):
    def digest(self, labels):
        label = labels[0]
        data = []

        for _, frame, _ in self.walk_within_label(label):
            std = np.std(frame, axis=0)
            mean_std = np.mean(std)
            data.append(float(mean_std))

        return data
