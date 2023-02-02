import maad
import numpy

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.enum.Indicator import Indicator


class BuilderIndicatorTemporalLeq(BaseBuilderIndicator):
    """The builder for indicator: Temporal Leq.

    See Also:
        https://scikit-maad.github.io/generated/maad.features.temporal_entropy.html
    """

    def __init__(self):
        super().__init__(
            Indicator.TemporalLeq,
            self.__processor,
        )

    def __processor(
        self,
        sound: numpy.ndarray,
        sample_rate: int,
    ) -> float:
        temporal_leq = maad.features.temporal_leq(sound, sample_rate, gain=42)

        print('Leq is %2.1fdB SPL' % temporal_leq)

        return temporal_leq
