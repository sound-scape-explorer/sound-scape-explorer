from dataclasses import dataclass

from processing.dtos import MetricDto
from processing.enums import MetricImplEnum


MetricPairing = [MetricImplEnum.CONTINGENCY, MetricImplEnum.SILHOUETTE]


@dataclass
class MetricConfig:
    index: int
    impl: MetricImplEnum
    is_pairwise: bool

    @classmethod
    def from_dto(cls, dto: MetricDto):
        return cls(
            index=dto.index,
            impl=dto.impl,
            is_pairwise=True if dto.impl in MetricPairing else False,
        )
