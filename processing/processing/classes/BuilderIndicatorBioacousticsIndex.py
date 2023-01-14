import maad
import numpy

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.enum.Indicator import Indicator


class BuilderIndicatorBioacousticsIndex(BaseBuilderIndicator):
    def __init__(self):
        super().__init__(
            Indicator.BioacousticsIndex,
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

        BI = maad.features.bioacoustics_index(spectrogram, fn)

        print('BI Soundecology : %2.2f ' % BI)

        return BI
