from processing.classes.BuilderIndicatorAcousticComplexityIndex import \
    BuilderIndicatorAcousticComplexityIndex
from processing.classes.BuilderIndicatorAcousticDiversityIndex import \
    BuilderIndicatorAcousticDiversityIndex
from processing.classes.BuilderIndicatorBioacousticsIndex import \
    BuilderIndicatorBioacousticsIndex
from processing.classes.BuilderIndicatorFrequencyEntropy import \
    BuilderIndicatorFrequencyEntropy
from processing.classes.BuilderIndicatorNormalizedDifferenceSoundscapeIndex \
    import \
    BuilderIndicatorNormalizedDifferenceSoundscapeIndex
from processing.classes.BuilderIndicatorTemporalEntropy import \
    BuilderIndicatorTemporalEntropy
from processing.classes.BuilderIndicatorTemporalLeq import \
    BuilderIndicatorTemporalLeq
from processing.classes.BuilderIndicatorTemporalMedian import \
    BuilderIndicatorTemporalMedian


class BuilderIndicator:
    """
    List all indicators builders
    """

    def __init__(self):
        # TODO: Add builder selection from configuration
        self.__register()
        self.__run()

    def __register(self):
        self.__indicators = []

        self.__indicators.append(BuilderIndicatorAcousticComplexityIndex)
        self.__indicators.append(BuilderIndicatorAcousticDiversityIndex)
        self.__indicators.append(BuilderIndicatorBioacousticsIndex)
        self.__indicators.append(BuilderIndicatorFrequencyEntropy)
        self.__indicators.append(
            BuilderIndicatorNormalizedDifferenceSoundscapeIndex
        )
        self.__indicators.append(BuilderIndicatorTemporalEntropy)
        self.__indicators.append(BuilderIndicatorTemporalLeq)
        self.__indicators.append(BuilderIndicatorTemporalMedian)

    def __run(self):
        for indicator in self.__indicators:
            instance = indicator()
            instance.export()
