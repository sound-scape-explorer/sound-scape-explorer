from dataclasses import dataclass
from enum import Enum

from processing.dtos import ExtractorDto
from processing.extractors.Extractor import Extractor
from processing.extractors.LogMelSpectrumExtractor import LogMelSpectrumExtractor
from processing.extractors.LogMelogramExtractor import LogMelogramExtractor
from processing.extractors.VggExtractor import VggExtractor
from processing.new.SettingsConfigNew import SettingsConfigNew


class ExtractorImpl(Enum):
    vgg = VggExtractor
    melogram = LogMelogramExtractor
    melspectrum = LogMelSpectrumExtractor


@dataclass
class ExtractorConfigNew:
    index: int
    name: str
    impl: ExtractorImpl
    offset: int
    step: int
    is_persist: bool

    @classmethod
    def from_dto(cls, dto: ExtractorDto):
        return cls(
            index=dto.index,
            name=dto.name,
            impl=ExtractorImpl[dto.impl.value],
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
