from typing import Dict, List, Tuple, Type

from processing.config.settings.SettingsConfig import SettingsConfig
from processing.extractors.AcousticComplexityExtractor import (
    AcousticComplexityExtractor,
)
from processing.extractors.AcousticDiversityIndexIndicator import (
    AcousticDiversityIndexExtractor,
)
from processing.extractors.BioacousticsIndexExtractor import BioacousticsIndexExtractor
from processing.extractors.Extractor import Extractor
from processing.extractors.FrequencyEntropyIndicator import FrequencyEntropyExtractor
from processing.extractors.LeqMaadExtractor import LeqMaadExtractor
from processing.extractors.SoundscapeIndexExtractor import SoundscapeIndexExtractor
from processing.extractors.TemporalEntropyExtractor import TemporalEntropyExtractor
from processing.extractors.TemporalMedianExtractor import TemporalMedianExtractor
from processing.extractors.VggExtractor import VggExtractor


# TODO: Add `yamnet` and `YamnetExtractor`
class ExtractorConfig:
    extractors: Dict[str, Type[Extractor]] = {
        "vgg": VggExtractor,
        "leq_maad": LeqMaadExtractor,
        "ht": TemporalEntropyExtractor,
        "med": TemporalMedianExtractor,
        "ndsi": SoundscapeIndexExtractor,
        "aci": AcousticComplexityExtractor,
        "adi": AcousticDiversityIndexExtractor,
        "bi": BioacousticsIndexExtractor,
        "hf": FrequencyEntropyExtractor,
        # TODO: Adapt leq enes output before adding here
    }

    nn_extractors = ["vgg"]
    """The list of extractors using neural networks.

    Add extractor key to this list in order to enable reduction and export features.
    """

    def __init__(
        self,
        index: int,
        name: str,
        offset: int,
        step: int,
        persist: bool,
    ) -> None:
        self.validate_name(name)

        self.index = index
        self.name = name
        self.offset = offset
        self.step = step
        self.persist = persist

    def validate_name(self, name: str) -> None:
        assert name in self.extractors.keys(), f"Unable to find extractor name {name}"

    def instanciate(self, settings: SettingsConfig) -> Extractor:
        instance = self.extractors[self.name]()

        instance.index = self.index
        instance.expected_sample_rate = settings.expected_sample_rate
        instance.offset = self.offset
        instance.step = self.step

        if self.persist:
            instance.persist()

        return instance

    @staticmethod
    def flatten(
        extractors: List["ExtractorConfig"],
    ) -> Tuple[List[str], List[int], List[int], List[int]]:
        names = [e.name for e in extractors]
        offsets = [e.offset for e in extractors]
        steps = [e.step for e in extractors]
        persists = [1 if e.persist is True else 0 for e in extractors]

        return names, offsets, steps, persists

    @staticmethod
    def reconstruct(
        names: List[str],
        offsets: List[int],
        steps: List[int],
        persists: List[bool],
    ) -> List["ExtractorConfig"]:
        extractors: List["ExtractorConfig"] = []

        for index, name in enumerate(names):
            extractor = ExtractorConfig(
                index=index,
                name=name,
                offset=offsets[index],
                step=steps[index],
                persist=persists[index],
            )

            extractors.append(extractor)

        return extractors
