from processing.audio.Audio import Audio
from processing.indicators.AbstractIndicator import AbstractIndicator
from processing.lib import ENES_index


class LeqEnesIndicator(AbstractIndicator):
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

        value = ENES_index.numpy_leq(
            waveform=audio.sound,
            sample_rate=audio.sample_rate,
            dt=audio.integration,
        )

        value = value[0][0]
        self.add_value(value)
