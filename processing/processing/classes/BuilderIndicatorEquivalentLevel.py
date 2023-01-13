import numpy
from numpy import ndarray

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.enum.Indicator import Indicator


class BuilderIndicatorEquivalentLevel(BaseBuilderIndicator):
    def __init__(self):
        super().__init__(
            Indicator.EquivalentLevel,
            self.__processor,
        )

    def __processor(self, sound: ndarray) -> float:
        return numpy.average(sound)
