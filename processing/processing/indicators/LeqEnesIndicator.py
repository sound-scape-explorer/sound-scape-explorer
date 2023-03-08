from processing.audio.Audio import Audio
from processing.indicators.AbstractIndicator import AbstractIndicator
from processing.lib import ENES_index
from processing.storage.Storage import Storage


class LeqEnesIndicator(AbstractIndicator):
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
        storage.create_group_indicator_leq_enes(
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

        value = ENES_index.numpy_Leq(
            waveform=audio.sound,
            sample_rate=audio.sample_rate,
            dt=audio.integration,
        )

        value = value[0][0]
        self.add_value(value)
