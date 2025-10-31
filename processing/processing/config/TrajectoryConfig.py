from dataclasses import dataclass

from processing.config.SettingsConfig import SettingsConfig
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
    def from_dto(cls, dto: TrajectoryDto, settings: SettingsConfig):
        return cls(
            index=dto.index,
            name=dto.name,
            start=convert_date_string_to_timestamp(dto.start, settings.timezone),
            end=convert_date_string_to_timestamp(dto.end, settings.timezone),
            tag_name=dto.tagName,
            tag_value=dto.tagValue,
            smoothing_window=dto.smoothingWindow,
        )
