from typing import Dict, List, Type

from processing.config.BandConfig import BandConfig
from processing.config.ConfigIntegration import ConfigIntegration
from processing.indicators.AbstractIndicator import AbstractIndicator
from processing.indicators.AcousticComplexityIndexIndicator import (
    AcousticComplexityIndexIndicator,
)
from processing.indicators.AcousticDiversityIndexIndicator import (
    AcousticDiversityIndexIndicator,
)
from processing.indicators.BioacousticsIndexIndicator import BioacousticsIndexIndicator
from processing.indicators.FrequencyEntropyIndicator import FrequencyEntropyIndicator
from processing.indicators.LeqEnesIndicator import LeqEnesIndicator
from processing.indicators.LeqMaadIndicator import LeqMaadIndicator
from processing.indicators.SoundscapeIndexIndicator import SoundscapeIndexIndicator
from processing.indicators.TemporalEntropyIndicator import TemporalEntropyIndicator
from processing.indicators.TemporalMedianIndicator import TemporalMedianIndicator


class ConfigIndicator:
    algorithms: Dict[str, Type[AbstractIndicator]] = {
        "leq_enes": LeqEnesIndicator,
        "leq_maad": LeqMaadIndicator,
        "med": TemporalMedianIndicator,
        "ht": TemporalEntropyIndicator,
        "hf": FrequencyEntropyIndicator,
        "aci": AcousticComplexityIndexIndicator,
        "adi": AcousticDiversityIndexIndicator,
        "bi": BioacousticsIndexIndicator,
        "ndsi": SoundscapeIndexIndicator,
    }

    index: int
    name: str
    band: BandConfig
    integration: ConfigIntegration
    instance: AbstractIndicator

    def __init__(
        self,
        index: int,
        name: str,
    ) -> None:
        self.validate_name(name=name)

        self.index = index
        self.name = name

    @staticmethod
    def validate_name(
        name: str,
    ) -> None:
        if name in ConfigIndicator.algorithms.keys():
            return

        raise KeyError(f"Unable to find indicator name {name}.")

    @staticmethod
    def flatten(
        indicators: List["ConfigIndicator"],
    ) -> List[str]:
        names = [i.name for i in indicators]

        return names

    @staticmethod
    def reconstruct(
        names: List[str],
    ) -> List["ConfigIndicator"]:
        indicators = []

        for index, name in enumerate(names):
            indicator = ConfigIndicator(
                index=index,
                name=name,
            )

            indicators.append(indicator)

        return indicators

    def create_instance(
        self,
        band: BandConfig,
        integration: ConfigIntegration,
    ) -> AbstractIndicator:
        self.band = band
        self.integration = integration
        self.instance = self.algorithms[self.name]()
        return self.instance
