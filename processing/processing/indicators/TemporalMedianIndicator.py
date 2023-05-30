import maad.features

from processing.audio.Audio import Audio
from processing.indicators.AbstractIndicator import AbstractIndicator


class TemporalMedianIndicator(AbstractIndicator):
    def __init__(
        self,
        band: str,
        integration: int,
    ) -> None:
        super().__init__(band, integration)

    def calculate(
        self,
        audio: Audio,
    ) -> None:
        if audio.is_sound_too_short():
            return self.add_nan()

        med = maad.features.temporal_median(
            s=audio.sound,
        )

        self.add_value(med)
