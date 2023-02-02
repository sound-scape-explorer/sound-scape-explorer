import maad
import numpy

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.enum.Indicator import Indicator


class BuilderIndicatorTemporalEntropy(BaseBuilderIndicator):
    """The builder for indicator: Temporal Entropy.

    See Also:
        https://scikit-maad.github.io/generated/maad.features.temporal_entropy.html
    """

    def __init__(self):
        super().__init__(
            Indicator.TemporalEntropy,
            self.__processor,
        )

    def __processor(
        self,
        sound: numpy.ndarray,
        sample_rate: int,
    ) -> float:
        temporal_entropy = maad.features.temporal_entropy(sound)

        print(temporal_entropy)

        return temporal_entropy
