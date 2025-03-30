from dataclasses import dataclass
from enum import Enum
from typing import Any, TypeVar, Union

from processing.dtos import ReducerDto
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.reducers.AbstractReducer import AbstractReducer
from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.SparsePcaReducer import SparsePcaReducer
from processing.reducers.UmapReducer import UmapReducer
from processing.reducers.VaeReducer import VaeReducer


T = TypeVar("T", bound=Union[BandConfigNew, IntegrationConfigNew, ExtractorConfigNew])


class ReducerImpl(Enum):
    umap = UmapReducer
    vae = VaeReducer
    pca = PcaReducer
    sparse_pca = SparsePcaReducer


@dataclass
class ReducerConfigNew:
    index: int
    impl: ReducerImpl
    dimensions: int
    bands: list[BandConfigNew]
    integrations: list[IntegrationConfigNew]
    extractors: list[ExtractorConfigNew]

    band: BandConfigNew = None
    integration: IntegrationConfigNew = None
    instance: AbstractReducer = None

    @classmethod
    def from_dto(
        cls,
        dto: ReducerDto,
        bands: list[BandConfigNew],
        integrations: list[IntegrationConfigNew],
        extractors: list[ExtractorConfigNew],
    ):
        impl = ReducerImpl[dto.impl.value]

        has_bands = len(dto.bands) > 0
        has_integrations = len(dto.integrations) > 0
        has_extractors = len(dto.extractors) > 0

        bands = cls._filter_by_name(dto.bands, bands) if has_bands else bands

        integrations = (
            cls._filter_by_name(dto.integrations, integrations)
            if has_integrations
            else integrations
        )

        extractors = (
            cls._filter_by_name(dto.extractors, extractors)
            if has_extractors
            else extractors
        )

        return cls(
            index=dto.index,
            impl=impl,
            dimensions=dto.dimensions,
            bands=bands,
            integrations=integrations,
            extractors=extractors,
        )

    @staticmethod
    def _filter_by_name(dto_items: list[Any], all_items: list[T]) -> list[T]:
        lookup = {}
        for item in all_items:
            lookup[item.name] = item
        filtered = [lookup[dto_item.name] for dto_item in dto_items]
        return filtered

    def start(
        self,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
    ) -> AbstractReducer:
        self.band = band
        self.integration = integration
        self.instance = self.impl.value()
        return self.instance
