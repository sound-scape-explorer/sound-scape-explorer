from processing.indicators.AcousticComplexityIndexIndicator import \
    AcousticComplexityIndexIndicator
from processing.indicators.AcousticDiversityIndexIndicator import \
    AcousticDiversityIndexIndicator
from processing.indicators.BioacousticsIndexIndicator import \
    BioacousticsIndexIndicator
from processing.indicators.FrequencyEntropyIndicator import \
    FrequencyEntropyIndicator
from processing.indicators.IndicatorName import IndicatorName
from processing.indicators.LeqEnesIndicator import LeqEnesIndicator
from processing.indicators.LeqMaadIndicator import LeqMaadIndicator
from processing.indicators.SoundscapeIndexIndicator import \
    SoundscapeIndexIndicator
from processing.indicators.TemporalEntropyIndicator import \
    TemporalEntropyIndicator
from processing.indicators.TemporalMedianIndicator import \
    TemporalMedianIndicator


class Indicator:
    def __new__(
        cls,
        name: str,
        band: str,
        integration: int,
        file_index: int,
    ):
        if name == IndicatorName.leq_enes.value:
            return LeqEnesIndicator(band, integration, file_index)

        elif name == IndicatorName.leq_maad.value:
            return LeqMaadIndicator(band, integration, file_index)

        elif name == IndicatorName.med.value:
            return TemporalMedianIndicator(band, integration, file_index)

        elif name == IndicatorName.ht.value:
            return TemporalEntropyIndicator(band, integration, file_index)

        elif name == IndicatorName.hf.value:
            return FrequencyEntropyIndicator(band, integration, file_index)

        elif name == IndicatorName.aci.value:
            return AcousticComplexityIndexIndicator(
                band,
                integration,
                file_index,
            )

        elif name == IndicatorName.adi.value:
            return AcousticDiversityIndexIndicator(
                band,
                integration,
                file_index,
            )

        elif name == IndicatorName.bi.value:
            return BioacousticsIndexIndicator(band, integration, file_index)

        elif name == IndicatorName.ndsi.value:
            return SoundscapeIndexIndicator(band, integration, file_index)

        else:
            cls.fail(name)

    @staticmethod
    def fail(name: str) -> None:
        raise KeyError(f'Indicator {name} not found!')

    @staticmethod
    def validate_name(name: str) -> None:
        names = set(name.value for name in IndicatorName)

        if name in names:
            return

        Indicator.fail(name)
