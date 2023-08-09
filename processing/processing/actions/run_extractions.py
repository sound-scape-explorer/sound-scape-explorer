from typing import List

import numpy as np

from processing.common.Env import Env
from processing.config.bands.BandStorage import BandStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.config.sites.SiteStorage import SiteStorage
from processing.extractors.Extractor import Extractor
from processing.extractors.LeqMaadExtractor import LeqMaadExtractor
from processing.extractors.VggExtractor import VggExtractor
from processing.storage.Storage import Storage
from processing.timeline.create_timelines import create_timelines
from processing.timeline.TimelineWalker import TimelineWalker


def run_extractions(env: Env):
    storage = Storage(path=env.storage)
    storage.overwrite()
    storage.delete("/aggregated")
    storage.delete("/aggregated_timestamps")
    storage.delete("/extracted")

    # retrieve configuration
    settings = SettingsStorage.read_from_storage(storage)
    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    sites = SiteStorage.read_from_storage(storage, settings)

    # configure extraction
    extractors: List[Extractor] = []

    leq = LeqMaadExtractor()
    leq.offset = 0
    leq.step = 1000
    leq.persist()

    extractors.append(leq)

    vgg = VggExtractor(expected_sample_rate=settings.expected_sample_rate)
    vgg.persist()

    extractors.append(vgg)

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

    tw.print_leftovers()


if __name__ == "__main__":
    env = Env()
    run_extractions(env)
