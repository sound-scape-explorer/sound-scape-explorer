import maad
import numpy

from processing.deprecated_base.BaseBuilderIndicator import BaseBuilderIndicator
from processing.deprecated_enum.Indicator import Indicator


class BuilderIndicatorFrequencyEntropy(BaseBuilderIndicator):
    """The builder for indicator: Frequency Entropy.

    See Also:
        https://scikit-maad.github.io/generated/maad.features
        .frequency_entropy.html
    """

    def __init__(self):
        super().__init__(
            Indicator.FrequencyEntropy,
            self.__processor,
        )

    def __processor(
        self,
        sound: numpy.ndarray,
        sample_rate: int,
    ) -> float:
        spectrogram, _, _, _ = maad.sound.spectrogram(sound, sample_rate)

        frequency_entropy, frequency_entropy_per_bin = \
            maad.features.frequency_entropy(
                spectrogram
            )

        print(frequency_entropy)
        print(
            'Length of Ht_per_bin is : %2.0f' % len(frequency_entropy_per_bin)
        )

        return frequency_entropy
