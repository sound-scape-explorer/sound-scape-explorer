from dataclasses import dataclass
from enum import Enum

from processing.dtos import IndexDto
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
from processing.new.SettingsConfigNew import SettingsConfigNew


class IndexImpl(Enum):
    leq_maad = LeqMaadExtractor
    ht = TemporalEntropyExtractor
    med = TemporalMedianExtractor
    ndsi = SoundscapeIndexExtractor
    aci = AcousticComplexityExtractor
    adi = AcousticDiversityIndexExtractor
    bi = BioacousticsIndexExtractor
    hf = FrequencyEntropyExtractor


@dataclass
class IndexConfigNew:
    index: int
    impl: IndexImpl
    offset: int
    step: int
    is_persist: bool

    @classmethod
    def from_dto(cls, dto: IndexDto):
        return cls(
            index=dto.index,
            impl=IndexImpl[dto.impl.value],
            offset=dto.offset,
            step=dto.step,
            is_persist=dto.isPersist,
        )

    # todo: simplify me?
    def start(self, settings: SettingsConfigNew):
        instance: Extractor = self.impl.value()

        instance.index = self.index
        instance.expected_sample_rate = settings.expected_sample_rate
        instance.offset = self.offset
        instance.step = self.step

        if self.is_persist:
            instance.persist()

        return instance
