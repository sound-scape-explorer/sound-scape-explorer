from dataclasses import dataclass

from processing.dtos import TrajectoryDto
from processing.enums import TrajectoryStepEnum
from processing.lib.time import convert_date_string_to_timestamp


@dataclass
class TrajectoryConfig:
    index: int
    name: str
    start: int  # unix
    end: int  # unix
    tag_name: str
    tag_value: str
    step: int

    @classmethod
    def from_dto(cls, dto: TrajectoryDto):
        if dto.step is TrajectoryStepEnum.HOUR:
            step = 60 * 60
        elif dto.step is TrajectoryStepEnum.DAY:
            step = 60 * 60 * 24
        elif dto.step is TrajectoryStepEnum.MONTH:
            step = 60 * 60 * 24 * 30
        else:
            raise Exception(f"Unknown step: {dto.step}")

        return cls(
            index=dto.index,
            name=dto.name,
            start=convert_date_string_to_timestamp(dto.start),
            end=convert_date_string_to_timestamp(dto.end),
            tag_name=dto.tagName,
            tag_value=dto.tagValue,
            step=step,
        )
