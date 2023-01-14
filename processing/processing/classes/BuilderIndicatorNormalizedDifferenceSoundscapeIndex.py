import maad
import numpy

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.enum.Indicator import Indicator


class BuilderIndicatorNormalizedDifferenceSoundscapeIndex(BaseBuilderIndicator):
    def __init__(self):
        super().__init__(
            Indicator.NormalizedDifferenceSoundscapeIndex,
            self.__processor,
        )

    def __processor(
        self,
        sound: numpy.ndarray,
        sample_rate: int,
    ) -> float:
        spectrogram, tn, fn, ext = maad.sound.spectrogram(sound, sample_rate)

        # noinspection PyPep8Naming
        NDSI, _, _, _ = maad.features.soundscape_index(
            spectrogram,
            fn
        )

        print('NDSI Soundecology : %2.2f ' % NDSI)

        return NDSI
