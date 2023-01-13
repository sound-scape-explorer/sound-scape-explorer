import maad
import numpy

from processing.base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.enum.Indicator import Indicator


class BuilderIndicatorAcousticComplexityIndex(BaseBuilderIndicator):
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

        return ACI
