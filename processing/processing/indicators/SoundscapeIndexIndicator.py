import maad.features

from processing.audio.Audio import Audio
from processing.indicators.AbstractIndicator import AbstractIndicator


class SoundscapeIndexIndicator(AbstractIndicator):
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
        if audio.spectrogram is None:
            return self.add_nan()

        ndsi, _, _, _ = maad.features.soundscape_index(
            Sxx_power=audio.spectrogram.s,
            fn=audio.spectrogram.fn,
        )

        self.add_value(ndsi)  # type: ignore
