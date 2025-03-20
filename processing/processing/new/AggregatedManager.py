from enum import Enum

from processing.common.Interval import Interval
from processing.common.Timeline import Timeline
from processing.context import Context
from processing.extractors.Extractor import Extractor
from processing.new.BandConfigNew import BandConfigNew
from processing.new.paths import register_path, build_path


class AggregatedPath(Enum):
    data = register_path("aggregated", "data")
    sites = register_path("aggregated", "sites")
    interval_details = register_path("aggregated", "interval_details")
    timestamps = register_path("aggregated", "timestamps")
    labels = register_path("aggregated", "labels")


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
    def to_storage(
        context: Context,
        band: BandConfigNew,
        extractor: Extractor,
        data: list[float],
        timeline: Timeline,
        interval_details: list[str],
        interval: Interval,
        labels: list[str],
    ):
        storage = context.storage
        path_suffix = [band.index, timeline.integration.index, extractor.index]

        # data
        data_path = build_path(AggregatedPath.data.value, *path_suffix)

        storage.append(
            path=data_path,
            data=[data],
            attributes={
                "extractor": extractor.__class__.__name__,
                "offset": str(extractor.offset),
                "step": str(extractor.step),
            },
        )

        # site
        site_path = build_path(AggregatedPath.sites.value, *path_suffix)
        storage.append(site_path, [[timeline.site.name]])

        # interval_details
        interval_details_path = build_path(
            AggregatedPath.interval_details.value, *path_suffix
        )
        storage.append(interval_details_path, [interval_details])

        # timestamp
        timestamp_path = build_path(
            AggregatedPath.timestamps.value,
            *path_suffix,
        )
        storage.append(timestamp_path, [[interval.start]])

        # labels
        labels_path = build_path(AggregatedPath.labels.value, *path_suffix)
        storage.append(labels_path, [labels])
