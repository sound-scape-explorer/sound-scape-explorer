from processing.dtos import BandDto
from dataclasses import dataclass


@dataclass
class BandConfigNew:
    index: int
    name: str
    low: int
    high: int

    @classmethod
    def from_dto(cls, dto: BandDto):
        return cls(
            index=dto.index,
            name=dto.name,
            low=dto.low,
            high=dto.high,
        )
