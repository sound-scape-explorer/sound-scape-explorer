import maad
import numpy

from processing.deprecated_base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.deprecated_enum.Indicator import Indicator


class BuilderIndicatorNormalizedDifferenceSoundscapeIndex(BaseBuilderIndicator):
    """The builder for indicator: Normalized Difference Soundscape Index.

    See Also:
        https://scikit-maad.github.io/generated/maad.features
        .soundscape_index.html#maad.features.soundscape_index
    """

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
