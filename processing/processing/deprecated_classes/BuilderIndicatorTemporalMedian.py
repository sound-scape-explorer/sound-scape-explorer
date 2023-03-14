import maad
import numpy

from processing.deprecated_base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.deprecated_enum.Indicator import Indicator


class BuilderIndicatorTemporalMedian(BaseBuilderIndicator):
    """The builder for indicator: Temporal Median.

    See Also:
        https://scikit-maad.github.io/generated/maad.features.temporal_median
        .html
    """

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
