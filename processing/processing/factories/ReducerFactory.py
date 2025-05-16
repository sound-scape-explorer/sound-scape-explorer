from processing.config.ReducerConfig import ReducerConfig
from processing.enums import ReducerImpl
from processing.reducers.AbstractReducer import AbstractReducer
from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.UmapReducer import UmapReducer


class ReducerFactory:
    @staticmethod
    def create(reducer: ReducerConfig) -> AbstractReducer:
        if reducer.impl is ReducerImpl.UMAP:
            return UmapReducer()
        elif reducer.impl is ReducerImpl.PCA:
            return PcaReducer()
        else:
            raise ValueError(f"Unknown reducer implementation: {reducer.impl}")
