import numpy as np

from processing.digesters.Digester import Digester


class MeanStandardDeviationDigester(Digester):
    def digest(self):
        data = []

        for _, frame, _, _ in self.walk_label_values():
            std = np.std(frame, axis=0)
            mean_std = np.mean(std)
            data.append(float(mean_std))

        return data
