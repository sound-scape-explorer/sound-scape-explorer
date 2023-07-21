import maad

from processing.audio.Audio import Audio
from processing.indicators.AbstractIndicator import AbstractIndicator


class LeqMaadIndicator(AbstractIndicator):
    def __init__(
        self,
    ) -> None:
        super().__init__()

    def calculate(
        self,
        audio: Audio,
    ) -> None:
        if audio.is_sound_too_short():
            return self.add_nan()

        value = maad.features.temporal_leq(
            s=audio.sound,
            fs=audio.sample_rate,
            gain=42,
        )

        self.add_value(value)  # type: ignore
