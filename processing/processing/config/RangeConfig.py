from dataclasses import dataclass

from processing.dtos import RangeDto
from processing.lib.time import convert_date_string_to_timestamp


@dataclass
class RangeConfig:
    index: int
    name: str
    start: int  # unix
    end: int  # unix

    @classmethod
    def from_dto(cls, dto: RangeDto):
        return cls(
            index=dto.index,
            name=dto.name,
            start=convert_date_string_to_timestamp(dto.start),
            end=convert_date_string_to_timestamp(dto.end),
        )
