from typing import List

from processing.common.Timeline import Timeline
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.settings.SettingsConfig import SettingsConfig
from processing.config.sites.SiteConfig import SiteConfig
from processing.storage.Storage import Storage


def create_timelines(
    sites: List[SiteConfig],
    integrations: List[IntegrationConfig],
    settings: SettingsConfig,
    storage: Storage,
) -> List[Timeline]:
    timelines: List[Timeline] = []

    for site in sites:
        for integration in integrations:
            timeline = Timeline(
                site=site,
                integration=integration,
                storage=storage,
                origin=settings.timeline_origin,
                # debug=True,
            )

            timelines.append(timeline)

    return timelines
