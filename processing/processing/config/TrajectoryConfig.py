from dataclasses import dataclass

from processing.dtos import TrajectoryDto
from processing.lib.time import convert_date_string_to_timestamp


@dataclass
class TrajectoryConfig:
    index: int
    name: str
    start: int  # unix ms
    end: int  # unix ms
    tag_name: str
    tag_value: str
    smoothing_window: int  # ms

    @classmethod
    def from_dto(cls, dto: TrajectoryDto):
        return cls(
            index=dto.index,
            name=dto.name,
            start=convert_date_string_to_timestamp(dto.start),
            end=convert_date_string_to_timestamp(dto.end),
            tag_name=dto.tagName,
            tag_value=dto.tagValue,
            smoothing_window=dto.smoothingWindow,
        )
