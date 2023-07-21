import maad.features

from processing.audio.Audio import Audio
from processing.indicators.AbstractIndicator import AbstractIndicator


class AcousticDiversityIndexIndicator(AbstractIndicator):
    def __init__(
        self,
    ) -> None:
        super().__init__()

    def calculate(
        self,
        audio: Audio,
    ) -> None:
        if audio.spectrogram_amplitude is None:
            return self.add_nan()

        adi = maad.features.acoustic_diversity_index(
            Sxx=audio.spectrogram_amplitude.s,
            fn=audio.spectrogram_amplitude.fn,
            fmax=10000,
            dB_threshold=-30,
        )

        self.add_value(adi)
