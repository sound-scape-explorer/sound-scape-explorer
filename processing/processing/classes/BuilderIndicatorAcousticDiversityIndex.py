import maad
import numpy

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.enum.Indicator import Indicator


class BuilderIndicatorAcousticDiversityIndex(BaseBuilderIndicator):
    """The builder for indicator: Acoustic Diversity Index.

    See Also:
        https://scikit-maad.github.io/generated/maad.features.acoustic_diversity_index.html
    """

    def __init__(self):
        super().__init__(
            Indicator.AcousticDiversityIndex,
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
        ADI = maad.features.acoustic_diversity_index(
            spectrogram,
            fn,
            fmax=10000,
            dB_threshold=-30
        )

        print('ADI : %2.2f ' % ADI)

        return ADI
