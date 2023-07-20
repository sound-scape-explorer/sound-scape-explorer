import maad.features

from processing.audio.Audio import Audio
from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.indicators.AbstractIndicator import AbstractIndicator


class BioacousticsIndexIndicator(AbstractIndicator):
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
        if audio.spectrogram_amplitude is None:
            return self.add_nan()

        bi = maad.features.bioacoustics_index(
            Sxx=audio.spectrogram_amplitude.s,
            fn=audio.spectrogram_amplitude.fn,
        )

        self.add_value(bi)
