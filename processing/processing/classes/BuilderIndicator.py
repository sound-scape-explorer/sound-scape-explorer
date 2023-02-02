from typing import List, Type, Union

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
    """The parent for all builders dedicated to "indicators".

    Registers all available indicator builders. Then, instance and call
    `.export()` on each.

    TODO: These indicators will be computed on grouped audio features and not
        source audio files' features.

    TODO: Add builder selection from user configuration.

    Attributes:
        __indicators: The list of all available indicator builders.
    """
    __indicators: List[
        Type[
            Union[
                BuilderIndicatorAcousticComplexityIndex,
                BuilderIndicatorAcousticDiversityIndex,
                BuilderIndicatorBioacousticsIndex,
                BuilderIndicatorFrequencyEntropy,
                BuilderIndicatorNormalizedDifferenceSoundscapeIndex,
                BuilderIndicatorTemporalEntropy,
                BuilderIndicatorTemporalLeq,
                BuilderIndicatorTemporalMedian,
            ]
        ]
    ]

    def __init__(self) -> None:
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
