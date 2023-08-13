from typing import Optional

import numpy as np
from rich import print

from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.config.sites.SiteStorage import SiteStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.timeline.create_timelines import create_timelines
from processing.timeline.TimelineWalker import TimelineWalker
from processing.utils.print_extractors import print_extractors
from processing.utils.print_no_configuration import print_no_configuration


def extract_and_aggregate(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    storage.overwrite()
    storage.delete(StoragePath.extracted)
    storage.delete(StoragePath.aggregated)
    storage.delete(StoragePath.aggregated_timestamps)

    # retrieve configuration
    settings = SettingsStorage.read_from_storage(storage)
    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    sites = SiteStorage.read_from_storage(storage, settings)
    extractors = ExtractorStorage.read_from_storage(storage)
    extractors_instances = [ex.instanciate(settings) for ex in extractors]

    print_extractors(extractors)

    # build timelines
    timelines = create_timelines(
        sites=sites,
        integrations=integrations,
        storage=storage,
        settings=settings,
    )

    print([(t.site.name, t.integration.seconds) for t in timelines])

    tw = TimelineWalker()
    tw.storage = storage
    tw.bands = bands
    tw.integrations = integrations
    tw.timelines = timelines
    tw.extractors = extractors_instances

    # walk intervals in timelines
    for interval_data, labels, interval, band, integration, extractor in tw.walk():
        # Aggregate
        aggregated_data = list(np.mean(interval_data, axis=0))

        path = (
            f"/{StoragePath.aggregated.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

        storage.append(
            path=path,
            data=[aggregated_data],
            compression=True,
            attributes={
                "extractor": extractor.__class__.__name__,
                "offset": str(extractor.offset),
                "step": str(extractor.step),
                "method": "for step in file in site",
            },
        )

        # Aggregated timestamps
        # INFO: This stores duplicated data as timestamps are the same for
        # band and extractor given a single integration
        t_path = (
            f"/{StoragePath.aggregated_timestamps.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

        storage.append(
            path=t_path,
            data=[[interval.start]],
        )

        # Aggregated labels
        # INFO: Same as above
        l_path = (
            f"/{StoragePath.aggregated_labels.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

        storage.append(
            path=l_path,
            data=[labels],
        )

    # tw.print_leftovers()
    print("[bold green]:rocket: Extractions and aggregations completed![/bold green]")

    if callback is not None:
        callback(storage)
