import maad
import numpy

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.enum.Indicator import Indicator


class BuilderIndicatorTemporalMedian(BaseBuilderIndicator):
    def __init__(self):
        super().__init__(
            Indicator.TemporalMedian,
            self.__processor,
        )

    def __processor(
        self,
        sound: numpy.ndarray,
        sample_rate: int,
    ) -> float:
        med = maad.features.temporal_median(sound)

        print('MED : %2.2f ' % med)

        return med
