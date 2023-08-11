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
from processing.timeline.create_timelines import create_timelines
from processing.timeline.TimelineWalker import TimelineWalker
from processing.utils.print_extractors import print_extractors


def run_extractions(
    storage: Storage,
    callback: IMain,
):
    if not Config.exists_in_storage(storage):
        print("[bold red]:no_entry: No configuration found in storage[/bold red]")
        callback(storage)
        return

    storage.overwrite()
    storage.delete("/aggregated")
    storage.delete("/aggregated_timestamps")
    storage.delete("/extracted")

    # retrieve configuration
    settings = SettingsStorage.read_from_storage(storage)
    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    sites = SiteStorage.read_from_storage(storage, settings)
    extractors = ExtractorStorage.instanciate_from_storage(storage, settings)

    print_extractors(storage)

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
    tw.extractors = extractors

    # walk intervals in timelines
    for interval_data, interval, band, integration, extractor in tw.walk():
        # Aggregate
        aggregated_data = list(np.mean(interval_data, axis=0))

        path = (
            f"/aggregated"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

        storage.append(
            path=path,
            data=[aggregated_data],
            compression=True,
        )

        # INFO: This stores duplicated data as timestamps are the same for
        # band and extractor given a single integration
        t_path = (
            f"/aggregated_timestamps"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

        storage.append(
            path=t_path,
            data=[[interval.start]],
        )

    # tw.print_leftovers()
    print("[bold green]:rocket: Extraction and aggregation completed[/bold green]")
    callback(storage)
