import maad.features

from processing.audio.Audio import Audio
from processing.indicators.AbstractIndicator import AbstractIndicator


class FrequencyEntropyIndicator(AbstractIndicator):
    def __init__(
        self,
    ) -> None:
        super().__init__()

    def calculate(
        self,
        audio: Audio,
    ) -> None:
        if audio.spectrogram is None:
            return self.add_nan()

        frequency_entropy, _ = maad.features.frequency_entropy(audio.spectrogram.s)

        self.add_value(frequency_entropy)  # type: ignore
