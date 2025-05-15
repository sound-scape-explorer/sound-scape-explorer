from dataclasses import dataclass

from processing.dtos import ReducerDto
from processing.enums import ReducerImplEnum


@dataclass
class ReducerConfig:
    index: int
    impl: ReducerImplEnum
    dimensions: int

    @classmethod
    def from_dto(
        cls,
        dto: ReducerDto,
    ):
        return cls(
            index=dto.index,
            impl=dto.impl,
            dimensions=dto.dimensions,
        )
