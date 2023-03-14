import maad
import numpy

from processing.deprecated_base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.deprecated_enum.Indicator import Indicator


class BuilderIndicatorAcousticComplexityIndex(BaseBuilderIndicator):
    """The builder for indicator: Acoustic Complexity Index.

    See Also:
        https://scikit-maad.github.io/generated/maad.features
        .acoustic_complexity_index.html#maad.features.acoustic_complexity_index
    """

    def __init__(self):
        super().__init__(
            Indicator.AcousticComplexityIndex,
            self.__processor,
        )

    def __processor(
        self,
        sound: numpy.ndarray,
        sample_rate: int,
    ) -> float:
        spectrogram, tn, fn, ext = maad.sound.spectrogram(
            sound,
            sample_rate,
            mode='amplitude'
        )

        # noinspection PyPep8Naming
        _, _, ACI = maad.features.acoustic_complexity_index(spectrogram)

        print('ACI : %2.0f ' % ACI)

        return ACI
