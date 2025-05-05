from dataclasses import dataclass

from processing.config.AutoclusterConfig import AutoclusterConfig
from processing.config.BandConfig import BandConfig
from processing.config.ExtractorConfig import ExtractorConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.MetricConfig import MetricConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.dtos import ExtractionDto


@dataclass
class ExtractionConfig:
    index: int
    name: str
    bands: list[BandConfig]
    integrations: list[IntegrationConfig]
    extractors: list[ExtractorConfig]
    reducers: list[ReducerConfig]
    autoclusters: list[AutoclusterConfig]
    metrics: list[MetricConfig]
    trajectories: list[TrajectoryConfig]

    @classmethod
    def from_dto(cls, dto: ExtractionDto):
        bands = [BandConfig.from_dto(b) for b in dto.bands]
        integrations = [IntegrationConfig.from_dto(i) for i in dto.integrations]
        extractors = [ExtractorConfig.from_dto(ex) for ex in dto.extractors]
        reducers = [ReducerConfig.from_dto(r) for r in dto.reducers]
        autoclusters = [AutoclusterConfig.from_dto(ac) for ac in dto.autoclusters]
        metrics = [MetricConfig.from_dto(m) for m in dto.metrics]
        trajectories = [TrajectoryConfig.from_dto(t) for t in dto.trajectories]

        return cls(
            index=dto.index,
            name=dto.name,
            bands=bands,
            integrations=integrations,
            extractors=extractors,
            reducers=reducers,
            autoclusters=autoclusters,
            metrics=metrics,
            trajectories=trajectories,
        )
