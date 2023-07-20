import maad

from processing.audio.Audio import Audio
from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.indicators.AbstractIndicator import AbstractIndicator


class TemporalEntropyIndicator(AbstractIndicator):
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
        if audio.is_sound_too_short():
            return self.add_nan()

        temporal_entropy = maad.features.temporal_entropy(audio.sound)

        self.add_value(temporal_entropy)  # type: ignore
