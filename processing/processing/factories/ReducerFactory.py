from processing.config.ReducerConfig import ReducerConfig
from processing.enums import ReducerImplEnum
from processing.reducers.AbstractReducer import AbstractReducer
from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.UmapReducer import UmapReducer


class ReducerFactory:
    @staticmethod
    def create(reducer: ReducerConfig) -> AbstractReducer:
        if reducer.impl is ReducerImplEnum.UMAP:
            instance = UmapReducer()
        elif reducer.impl is ReducerImplEnum.PCA:
            instance = PcaReducer()
        else:
            raise Exception(f"Unknown reducer implementation: {reducer.impl}")

        return instance
