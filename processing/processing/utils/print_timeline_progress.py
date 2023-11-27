from datetime import datetime

from rich import print

from processing.common.Interval import Interval
from processing.common.Timeline import Timeline


def print_timeline_progress(
    timeline: Timeline,
    interval: Interval,
) -> None:
    start_seconds = interval.start / 1000
    date_format = "%Y-%m-%d %H:%M:%S"
    human_date = datetime.fromtimestamp(start_seconds).strftime(date_format)
    site_name = timeline.site.name
    integration_text = f"{timeline.integration.seconds}s"

    print(human_date, site_name, integration_text)
