from dataclasses import dataclass

from processing.dtos import AutoclusterDto
from processing.enums import AutoclusterImpl


@dataclass
class AutoclusterConfig:
    index: int
    name: str
    impl: AutoclusterImpl
    min_cluster_size: int
    min_samples: int
    alpha: float
    epsilon: float

    none_string = "None"

    @classmethod
    def from_dto(cls, dto: AutoclusterDto):
        name = f"{dto.index}_{dto.impl.name}"

        return cls(
            index=dto.index,
            name=name,
            impl=dto.impl,
            min_cluster_size=dto.minClusterSize,
            min_samples=dto.minSamples,
            alpha=dto.alpha,
            epsilon=dto.epsilon,
        )
