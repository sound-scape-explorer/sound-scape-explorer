import maad

from processing.audio.Audio import Audio
from processing.indicators.AbstractIndicator import AbstractIndicator


class TemporalEntropyIndicator(AbstractIndicator):
    def __init__(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        super().__init__(band, integration, file_index)

    def calculate(
        self,
        audio: Audio,
    ) -> None:
        if audio.is_sound_too_short():
            return self.add_nan()

        temporal_entropy = maad.features.temporal_entropy(audio.sound)

        self.add_value(temporal_entropy)
