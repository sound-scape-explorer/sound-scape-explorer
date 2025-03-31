from typing import List

from processing.common.Timeline import Timeline
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.SettingsConfigNew import SettingsConfigNew
from processing.new.SiteConfigNew import SiteConfigNew
from processing.new.StorageNew import StorageNew


def create_timelines(
    sites: List[SiteConfigNew],
    integrations: List[IntegrationConfigNew],
    settings: SettingsConfigNew,
    storage: StorageNew,
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
