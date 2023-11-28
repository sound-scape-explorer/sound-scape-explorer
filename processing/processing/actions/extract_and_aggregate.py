import numpy as np

from processing.common.AggregatedStorage import AggregatedStorage
from processing.common.TimelineWalker import TimelineWalker
from processing.config.bands.BandStorage import BandStorage
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.config.sites.SiteStorage import SiteStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.create_timelines import create_timelines
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.print_extractors import print_extractors
from processing.utils.validate_configuration import validate_configuration


@validate_configuration
def extract_and_aggregate(
    storage: Storage,
    callback: MenuCallback,
):
    print_action("Extractions and aggregations started!", "start")

    storage.delete(StoragePath.extracted)
    AggregatedStorage.delete(storage)

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
        interval_details,
        interval,
        band,
        extractor,
        timeline,
    ) in tw.walk():
        if len(interval_data) == 0:
            continue

        # Aggregate
        aggregated_data = list(np.mean(interval_data, axis=0))

        AggregatedStorage.append_data(
            storage=storage,
            data=aggregated_data,
            band=band,
            integration=timeline.integration,
            extractor=extractor,
        )

        AggregatedStorage.append_site(
            storage=storage,
            site=timeline.site.name,
            band=band,
            integration=timeline.integration,
            extractor=extractor,
        )

        AggregatedStorage.append_interval_details(
            storage=storage,
            interval_details=interval_details,
            band=band,
            integration=timeline.integration,
            extractor=extractor,
        )

        AggregatedStorage.append_timestamp(
            storage=storage,
            timestamp=interval.start,
            band=band,
            integration=timeline.integration,
            extractor=extractor,
        )

        AggregatedStorage.append_labels(
            storage=storage,
            labels=labels,
            band=band,
            integration=timeline.integration,
            extractor=extractor,
        )

    # tw.print_leftovers()
    print_action("Extractions and aggregations completed!", "end")
    invoke_menu(storage, callback)
