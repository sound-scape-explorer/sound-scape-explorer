import numpy

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator


class BuilderIndicatorEquivalentLevel(BaseBuilderIndicator):
    def __init__(self):
        super().__init__('equivalent_level', self.__process)

    def __process(self, sound):
        equivalent_level = numpy.average(sound)
        return equivalent_level
