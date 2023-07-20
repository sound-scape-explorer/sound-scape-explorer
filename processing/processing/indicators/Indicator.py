from abc import abstractmethod

from processing.audio.Audio import Audio
from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.indicators.AcousticComplexityIndexIndicator import (
    AcousticComplexityIndexIndicator,
)
from processing.indicators.AcousticDiversityIndexIndicator import (
    AcousticDiversityIndexIndicator,
)
from processing.indicators.BioacousticsIndexIndicator import BioacousticsIndexIndicator
from processing.indicators.FrequencyEntropyIndicator import FrequencyEntropyIndicator
from processing.indicators.IndicatorName import IndicatorName
from processing.indicators.LeqEnesIndicator import LeqEnesIndicator
from processing.indicators.LeqMaadIndicator import LeqMaadIndicator
from processing.indicators.SoundscapeIndexIndicator import SoundscapeIndexIndicator
from processing.indicators.TemporalEntropyIndicator import TemporalEntropyIndicator
from processing.indicators.TemporalMedianIndicator import TemporalMedianIndicator
from processing.storage.Storage import Storage


class Indicator:
    def __new__(
        cls,
        name: str,
        band: ConfigBand,
        integration: ConfigIntegration,
    ):
        if name == IndicatorName.leq_enes.value:
            return LeqEnesIndicator(band, integration)

        elif name == IndicatorName.leq_maad.value:
            return LeqMaadIndicator(band, integration)

        elif name == IndicatorName.med.value:
            return TemporalMedianIndicator(band, integration)

        elif name == IndicatorName.ht.value:
            return TemporalEntropyIndicator(band, integration)

        elif name == IndicatorName.hf.value:
            return FrequencyEntropyIndicator(band, integration)

        elif name == IndicatorName.aci.value:
            return AcousticComplexityIndexIndicator(
                band,
                integration,
            )

        elif name == IndicatorName.adi.value:
            return AcousticDiversityIndexIndicator(
                band,
                integration,
            )

        elif name == IndicatorName.bi.value:
            return BioacousticsIndexIndicator(band, integration)

        elif name == IndicatorName.ndsi.value:
            return SoundscapeIndexIndicator(band, integration)

        else:
            cls.fail(name)

    @staticmethod
    def fail(name: str) -> None:
        raise KeyError(f"Unable to find indicator name {name}.")

    @staticmethod
    def validate_name(name: str) -> None:
        names = set(name.value for name in IndicatorName)

        if name in names:
            return

        Indicator.fail(name)

    @abstractmethod
    def calculate(self, audio: Audio) -> None:
        pass

    @abstractmethod
    def store(self, storage: Storage, index: int) -> None:
        pass
