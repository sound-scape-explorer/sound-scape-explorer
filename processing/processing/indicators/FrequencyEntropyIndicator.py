import maad.features

from processing.audio.Audio import Audio
from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.indicators.AbstractIndicator import AbstractIndicator


class FrequencyEntropyIndicator(AbstractIndicator):
    def __init__(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> None:
        super().__init__(band, integration)

    def calculate(
        self,
        audio: Audio,
    ) -> None:
        if audio.spectrogram is None:
            return self.add_nan()

        frequency_entropy, _ = maad.features.frequency_entropy(audio.spectrogram.s)

        self.add_value(frequency_entropy)  # type: ignore
