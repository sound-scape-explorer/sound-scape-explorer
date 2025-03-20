from typing import List

from processing.common.Timeline import Timeline
from processing.context import Context
from processing.new.SiteManager import SiteManager


def create_timelines(
    context: Context,
) -> List[Timeline]:
    sites = SiteManager.sort_files_by_site(context)
    integrations = context.config.integrations
    storage = context.storage
    origin = context.config.settings.timeline_origin

    timelines: List[Timeline] = []

    for site in sites:
        for integration in integrations:
            timeline = Timeline(
                name=site,
                files=sites[site],
                integration=integration,
                storage=storage,
                origin=origin,
                # debug=True,
            )

            timelines.append(timeline)

    return timelines
