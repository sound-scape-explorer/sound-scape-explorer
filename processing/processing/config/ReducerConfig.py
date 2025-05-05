from dataclasses import dataclass

from processing.dtos import ReducerDto
from processing.enums import ReducerImplEnum
from processing.reducers.AbstractReducerNew import AbstractReducerNew
from processing.reducers.PcaReducerNew import PcaReducerNew
from processing.reducers.UmapReducerNew import UmapReducerNew


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

    def create(self) -> AbstractReducerNew:
        if self.impl is ReducerImplEnum.UMAP:
            return UmapReducerNew()
        elif self.impl is ReducerImplEnum.PCA:
            return PcaReducerNew()
        else:
            raise Exception(f"Unknown reducer implementation: {self.impl}")
