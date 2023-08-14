from typing import Optional

import numpy as np
from rich import print

from processing.common.TimelineWalker import TimelineWalker
from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.config.sites.SiteStorage import SiteStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.create_timelines import create_timelines
from processing.utils.print_action import print_action
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

    print_action("Extractions and aggregations started!", "start")

    storage.delete(StoragePath.extracted)
    storage.delete(StoragePath.aggregated)
    storage.delete(StoragePath.aggregated_site_file_indexes)
    storage.delete(StoragePath.aggregated_timestamps)
    storage.delete(StoragePath.aggregated_labels)

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
    for (
        interval_data,
        labels,
        file_indexes,
        interval,
        band,
        extractor,
        timeline,
    ) in tw.walk():
        # Aggregate
        aggregated_data = list(np.mean(interval_data, axis=0))

        path = (
            f"/{StoragePath.aggregated.value}"
            f"/{band.name}"
            f"/{timeline.integration.seconds}"
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

        # Aggregated site and file indexes
        s_path = (
            f"/{StoragePath.aggregated_site_file_indexes.value}"
            f"/{band.name}"
            f"/{timeline.integration.seconds}"
            f"/{extractor.index}"
        )

        site_file_indexes = [timeline.site.name, *[str(f) for f in file_indexes]]

        storage.append(
            path=s_path,
            data=[site_file_indexes],
            attributes={
                "description": "First column is site name followed by file indexes",
            },
        )

        # Aggregated timestamps
        # INFO: This stores duplicated data as timestamps are the same for
        # band and extractor given a single integration
        t_path = (
            f"/{StoragePath.aggregated_timestamps.value}"
            f"/{band.name}"
            f"/{timeline.integration.seconds}"
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
            f"/{timeline.integration.seconds}"
            f"/{extractor.index}"
        )

        storage.append(
            path=l_path,
            data=[labels],
        )

    # tw.print_leftovers()
    print_action("Extractions and aggregations completed!", "end")

    if callback is not None:
        callback(storage)
