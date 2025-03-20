from dataclasses import dataclass

from processing.dtos import RangeDto
from processing.new.time import convert_date_string_to_timestamp


@dataclass
class RangeConfigNew:
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
