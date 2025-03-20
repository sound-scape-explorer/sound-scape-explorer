from dataclasses import dataclass

from processing.dtos import IntegrationDto


@dataclass
class IntegrationConfigNew:
    index: int
    name: str
    duration: int  # ms

    @classmethod
    def from_dto(cls, dto: IntegrationDto):
        return cls(
            index=dto.index,
            name=dto.name,
            duration=dto.duration * 1000,
        )
