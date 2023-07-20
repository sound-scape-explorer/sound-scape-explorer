import maad.features

from processing.audio.Audio import Audio
from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.indicators.AbstractIndicator import AbstractIndicator


class AcousticComplexityIndexIndicator(AbstractIndicator):
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

        _, _, aci = maad.features.acoustic_complexity_index(
            audio.spectrogram_amplitude.s,
        )

        self.add_value(aci)
