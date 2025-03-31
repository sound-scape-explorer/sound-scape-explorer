from enum import Enum

from h5py import Dataset
from typing_extensions import NamedTuple, Union

from processing.common.Interval import Interval
from processing.common.Timeline import Timeline
from processing.context import Context
from processing.extractors.Extractor import Extractor
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.paths import register_path, build_path


class AggregatedPath(Enum):
    data = register_path("aggregated", "data")
    sites = register_path("aggregated", "sites")
    interval_details = register_path("aggregated", "interval_details")
    timestamps = register_path("aggregated", "timestamps")
    labels = register_path("aggregated", "labels")


class _AggregatedInstancePaths(NamedTuple):
    data: str
    sites: str
    interval_details: str
    timestamps: str
    labels: str


class _AggregatedInstanceDatasets(NamedTuple):
    data: Dataset
    sites: list[str]
    interval_details: Dataset
    timestamps: Dataset
    labels: list[list[str]]


class AggregatedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(AggregatedPath.data.value)
        context.storage.delete(AggregatedPath.sites.value)
        context.storage.delete(AggregatedPath.interval_details.value)
        context.storage.delete(AggregatedPath.timestamps.value)
        context.storage.delete(AggregatedPath.labels.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(AggregatedPath.data.value)
            and context.storage.exists(AggregatedPath.sites.value)
            and context.storage.exists(AggregatedPath.interval_details.value)
            and context.storage.exists(AggregatedPath.timestamps.value)
            and context.storage.exists(AggregatedPath.labels.value)
        )

    @staticmethod
    def _get_paths(
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: Union[Extractor, ExtractorConfigNew],
    ):
        path_suffix = [band.index, integration.index, extractor.index]

        return _AggregatedInstancePaths(
            data=build_path(AggregatedPath.data.value, *path_suffix),
            sites=build_path(AggregatedPath.sites.value, *path_suffix),
            interval_details=build_path(
                AggregatedPath.interval_details.value, *path_suffix
            ),
            timestamps=build_path(
                AggregatedPath.timestamps.value,
                *path_suffix,
            ),
            labels=build_path(AggregatedPath.labels.value, *path_suffix),
        )

    @staticmethod
    def to_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: Extractor,
        data: list[float],
        timeline: Timeline,
        interval_details: list[str],
        interval: Interval,
        labels: list[str],
    ):
        storage = context.storage
        paths = AggregatedManager._get_paths(band, integration, extractor)

        # data
        storage.append(
            path=paths.data,
            data=[data],
            attributes={
                "extractor": extractor.__class__.__name__,
                "offset": str(extractor.offset),
                "step": str(extractor.step),
            },
        )

        # site
        storage.append(paths.sites, [[timeline.site.name]])

        # interval_details
        storage.append(paths.interval_details, [interval_details])

        # timestamp
        storage.append(paths.timestamps, [[interval.start]])

        # labels
        storage.append(paths.labels, [labels])

    @staticmethod
    def from_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ):
        storage = context.storage
        paths = AggregatedManager._get_paths(band, integration, extractor)

        return _AggregatedInstanceDatasets(
            data=storage.read(paths.data),
            sites=storage.read_strings(paths.sites),
            interval_details=storage.read(paths.interval_details),
            timestamps=storage.read(paths.timestamps),
            labels=storage.read_strings(paths.labels),
        )
