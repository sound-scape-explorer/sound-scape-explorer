from enum import Enum
from typing import NamedTuple

import numpy as np

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.constants import STRING_DELIMITER
from processing.context import Context
from processing.interfaces import TimelineAggregated, AggregatedData
from processing.services.SiteService import SiteWithFiles, SiteService
from processing.paths.path_registry import register_path, build_path


class AggregatedPath(Enum):
    EMBEDDINGS = register_path("aggregated", "embeddings")
    TIMESTAMPS = register_path("aggregated", "timestamps")
    FILE_INDICES = register_path("aggregated", "file_indices")
    FILE_RELATIVE_PATHS = register_path("aggregated", "file_relative_starts")
    EXTRACTOR_INDICES = register_path("aggregated", "extractor_indices")


class _Paths(NamedTuple):
    embeddings: str
    timestamps: str
    file_indices: str
    file_relative_starts: str
    extractor_indices: str


class AggregatedRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(AggregatedPath.EMBEDDINGS.value)
        context.storage.delete(AggregatedPath.TIMESTAMPS.value)
        context.storage.delete(AggregatedPath.FILE_INDICES.value)
        context.storage.delete(AggregatedPath.FILE_RELATIVE_PATHS.value)
        context.storage.delete(AggregatedPath.EXTRACTOR_INDICES.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(AggregatedPath.EMBEDDINGS.value)
            and context.storage.exists(AggregatedPath.TIMESTAMPS.value)
            and context.storage.exists(AggregatedPath.FILE_INDICES.value)
            and context.storage.exists(AggregatedPath.FILE_RELATIVE_PATHS.value)
            and context.storage.exists(AggregatedPath.EXTRACTOR_INDICES.value)
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
            embeddings=build_path(AggregatedPath.EMBEDDINGS.value, *path_suffix),
            timestamps=build_path(AggregatedPath.TIMESTAMPS.value, *path_suffix),
            file_indices=build_path(AggregatedPath.FILE_INDICES.value, *path_suffix),
            file_relative_starts=build_path(
                AggregatedPath.FILE_RELATIVE_PATHS.value,
                *path_suffix,
            ),
            extractor_indices=build_path(
                AggregatedPath.EXTRACTOR_INDICES.value,
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
        all_aggregated: list[TimelineAggregated],
    ):
        paths = AggregatedRepository._get_paths(extraction, band, integration, site)

        all_embeddings: list[np.ndarray] = []
        all_timestamps: list[int] = []
        all_file_indices: list[str] = []
        all_file_relative_starts: list[str] = []
        all_extractor_indices: list[str] = []

        for aggregated in all_aggregated:
            all_embeddings.append(aggregated.embeddings)
            all_timestamps.append(aggregated.start)

            file_indices: list[str] = []
            file_relative_starts: list[str] = []
            extractor_indices: list[str] = []

            for s in aggregated.slices:
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
            paths = AggregatedRepository._get_paths(
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
        """Retrieves and rebuild aggregated data"""

        storage = context.storage
        sites = SiteService.get_sites(context)
        all_aggregated: list[AggregatedData] = []

        for site in sites:
            paths = AggregatedRepository._get_paths(
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

                aggregated = AggregatedData(
                    embeddings=embeddings[i],
                    start=timestamps[i],
                    end=timestamps[i] + integration.duration,
                    files=list(files),
                    extractors=list(extractors),
                )

                all_aggregated.append(aggregated)

        return all_aggregated
