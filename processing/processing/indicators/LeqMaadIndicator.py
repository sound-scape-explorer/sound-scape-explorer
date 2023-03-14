import maad

from processing.audio.Audio import Audio
from processing.indicators.AbstractIndicator import AbstractIndicator
from processing.storage.Storage import Storage


class LeqMaadIndicator(AbstractIndicator):
    def __init__(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        super().__init__(band, integration, file_index)

    def store(
        self,
        storage: Storage,
    ) -> None:
        storage.create_group_indicator_leq_maad(
            band=self._band,
            integration=self._integration,
            file_index=self._file_index,
            values=self._values,
        )

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

        self.add_value(value)
