from numpy import ndarray

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.enum.Indicator import Indicator


class BuilderIndicatorNormalizedDifferenceSoundscapeIndex(BaseBuilderIndicator):
    def __init__(self):
        super().__init__(
            Indicator.NormalizedDifferenceSoundscapeIndex,
            self.__processor,
        )

    def __processor(self, sound: ndarray) -> float:
        return sound[0]
