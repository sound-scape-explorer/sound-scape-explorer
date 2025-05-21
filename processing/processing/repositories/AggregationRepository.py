from enum import Enum
from typing import NamedTuple

import numpy as np

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.constants import STRING_DELIMITER
from processing.context import Context
from processing.enums import StorageDomain, AggregationStoragePath
from processing.interfaces import TimelineAggregate, AggregationData
from processing.paths.PathRegistry import PathRegistry
from processing.services.SiteService import SiteWithFiles, SiteService


_domain = StorageDomain.aggregations
_paths = AggregationStoragePath


class AggregationPath(Enum):
    EMBEDDINGS = PathRegistry.register(_domain, _paths.embeddings)
    TIMESTAMPS = PathRegistry.register(_domain, _paths.timestamps)
    FILE_INDICES = PathRegistry.register(_domain, _paths.file_indices)
    FILE_RELATIVE_STARTS = PathRegistry.register(_domain, _paths.file_relative_starts)
    EXTRACTOR_INDICES = PathRegistry.register(_domain, _paths.extractor_indices)


class _Paths(NamedTuple):
    embeddings: str
    timestamps: str
    file_indices: str
    file_relative_starts: str
    extractor_indices: str


class AggregationRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(AggregationPath.EMBEDDINGS.value)
        context.storage.delete(AggregationPath.TIMESTAMPS.value)
        context.storage.delete(AggregationPath.FILE_INDICES.value)
        context.storage.delete(AggregationPath.FILE_RELATIVE_STARTS.value)
        context.storage.delete(AggregationPath.EXTRACTOR_INDICES.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(AggregationPath.EMBEDDINGS.value)
            and context.storage.exists(AggregationPath.TIMESTAMPS.value)
            and context.storage.exists(AggregationPath.FILE_INDICES.value)
            and context.storage.exists(AggregationPath.FILE_RELATIVE_STARTS.value)
            and context.storage.exists(AggregationPath.EXTRACTOR_INDICES.value)
        )

    @staticmethod
    def _get_paths(
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        site: SiteWithFiles,
    ):
        path_suffix = [
            extraction.index,
            band.index,
            integration.index,
            site.name,
        ]

        return _Paths(
            embeddings=PathRegistry.build(
                AggregationPath.EMBEDDINGS.value,
                *path_suffix,
            ),
            timestamps=PathRegistry.build(
                AggregationPath.TIMESTAMPS.value,
                *path_suffix,
            ),
            file_indices=PathRegistry.build(
                AggregationPath.FILE_INDICES.value,
                *path_suffix,
            ),
            file_relative_starts=PathRegistry.build(
                AggregationPath.FILE_RELATIVE_STARTS.value,
                *path_suffix,
            ),
            extractor_indices=PathRegistry.build(
                AggregationPath.EXTRACTOR_INDICES.value,
                *path_suffix,
            ),
        )

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        site: SiteWithFiles,
        aggregates: list[TimelineAggregate],
    ):
        paths = AggregationRepository._get_paths(extraction, band, integration, site)

        all_embeddings: list[np.ndarray] = []
        all_timestamps: list[int] = []
        all_file_indices: list[str] = []
        all_file_relative_starts: list[str] = []
        all_extractor_indices: list[str] = []

        for agg in aggregates:
            all_embeddings.append(agg.embeddings)
            all_timestamps.append(agg.start)

            file_indices: list[str] = []
            file_relative_starts: list[str] = []
            extractor_indices: list[str] = []

            for s in agg.slices:
                file_indices.append(str(s.file.index))
                file_relative_starts.append(str(s.rstart))
                extractor_indices.append(str(s.extractor.index))

            all_file_indices.append(STRING_DELIMITER.join(file_indices))
            all_file_relative_starts.append(STRING_DELIMITER.join(file_relative_starts))
            all_extractor_indices.append(STRING_DELIMITER.join(extractor_indices))

        context.storage.append(
            path=paths.embeddings,
            data=np.array(all_embeddings),
        )

        context.storage.append(
            path=paths.timestamps,
            data=np.array(all_timestamps),
        )

        context.storage.append(
            path=paths.file_indices,
            data=np.array(all_file_indices),
        )

        context.storage.append(
            path=paths.file_relative_starts,
            data=np.array(all_file_relative_starts),
        )

        context.storage.append(
            path=paths.extractor_indices,
            data=np.array(all_extractor_indices),
        )

    @staticmethod
    def from_storage_embeddings(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        """Retrieves all embeddings from storage for all sites."""

        sites = SiteService.get_sites(context)
        all_embeddings = []

        for site in sites:
            paths = AggregationRepository._get_paths(
                extraction,
                band,
                integration,
                site,
            )

            embeddings = context.storage.read(paths.embeddings)
            all_embeddings.extend(embeddings)

        return np.stack(all_embeddings)

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        """Retrieves and rebuild aggregation data objects"""

        storage = context.storage
        sites = SiteService.get_sites(context)
        aggregations: list[AggregationData] = []

        for site in sites:
            paths = AggregationRepository._get_paths(
                extraction=extraction,
                band=band,
                integration=integration,
                site=site,
            )

            embeddings = storage.read(paths.embeddings)
            timestamps = storage.read(paths.timestamps)
            all_file_indices = storage.read_strings(paths.file_indices)
            all_extractor_indices = storage.read_strings(paths.extractor_indices)

            for i in range(timestamps.shape[0]):
                file_indices = all_file_indices[i].split(STRING_DELIMITER)
                file_indices: list[int] = [int(i) for i in file_indices]

                extractor_indices = all_extractor_indices[i].split(STRING_DELIMITER)
                extractor_indices: list[int] = [int(i) for i in extractor_indices]

                files = filter(lambda f: f.index in file_indices, site.files)

                extractors = filter(
                    lambda e: e.index in extractor_indices,
                    extraction.extractors,
                )

                aggregation = AggregationData(
                    embeddings=embeddings[i],
                    start=timestamps[i],
                    end=timestamps[i] + integration.duration,
                    files=list(files),
                    extractors=list(extractors),
                )

                aggregations.append(aggregation)

        return aggregations
