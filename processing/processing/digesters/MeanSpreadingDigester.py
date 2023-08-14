from typing import List

import numpy as np

from processing.config.labels.LabelConfig import LabelConfig
from processing.digesters.Digester import Digester


class MeanSpreadingDigester(Digester):
    def digest(self, labels: List[LabelConfig]):
        label = labels[0]
        data = []

        for _, frame, _ in self.walk_within_label(label):
            percentile_95th = np.nanpercentile(frame, 95, axis=0)
            percentile_5th = np.nanpercentile(frame, 5, axis=0)
            mean = np.mean(percentile_95th - percentile_5th)
            data.append(float(mean))

        return data
