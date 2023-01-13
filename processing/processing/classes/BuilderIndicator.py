from processing.classes.BuilderIndicatorAcousticComplexityIndex import \
    BuilderIndicatorAcousticComplexityIndex
from processing.classes.BuilderIndicatorAcousticDiversityIndex import \
    BuilderIndicatorAcousticDiversityIndex
from processing.classes.BuilderIndicatorBioAcousticIndex import \
    BuilderIndicatorBioAcousticIndex
from processing.classes.BuilderIndicatorEnvelopeMedian import \
    BuilderIndicatorEnvelopeMedian
from processing.classes.BuilderIndicatorEquivalentLevel import \
    BuilderIndicatorEquivalentLevel
from processing.classes.BuilderIndicatorFrequencyEntropy import \
    BuilderIndicatorFrequencyEntropy
from processing.classes.BuilderIndicatorNormalizedDifferenceSoundscapeIndex \
    import \
    BuilderIndicatorNormalizedDifferenceSoundscapeIndex
from processing.classes.BuilderIndicatorTemporalEntropy import \
    BuilderIndicatorTemporalEntropy


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
        self.__indicators.append(BuilderIndicatorBioAcousticIndex)
        self.__indicators.append(BuilderIndicatorEnvelopeMedian)
        self.__indicators.append(BuilderIndicatorEquivalentLevel)
        self.__indicators.append(BuilderIndicatorFrequencyEntropy)
        self.__indicators.append(
            BuilderIndicatorNormalizedDifferenceSoundscapeIndex
        )
        self.__indicators.append(BuilderIndicatorTemporalEntropy)

    def __run(self):
        for indicator in self.__indicators:
            instance = indicator()
            instance.export()
