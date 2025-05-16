from dataclasses import dataclass

from processing.dtos import ReducerDto
from processing.enums import ReducerImpl


@dataclass
class ReducerConfig:
    index: int
    impl: ReducerImpl
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
