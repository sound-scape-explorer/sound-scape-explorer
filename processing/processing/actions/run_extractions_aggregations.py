import numpy as np

from processing.common.TimelineWalker import TimelineWalker
from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.ExtractedManager import ExtractedManager
from processing.new.SiteManager import SiteManager
from processing.printers.print_action import print_action
from processing.printers.print_extractors import print_extractors
from processing.printers.print_indices import print_indices
from processing.utils.create_timelines import create_timelines


# TODO: refactor me after JR meeting
def run_extractions_aggregations(context: Context):
    print_action("Extractions and aggregations started!", "start")

    storage = context.storage

    ExtractedManager.delete(context)
    AggregatedManager.delete(context)

    settings = context.config.settings
    bands = context.config.bands
    integrations = context.config.integrations
    extractors = context.config.extractors
    extractors_instances = [ex.start(settings) for ex in extractors]
    indices = context.config.indices
    indices_instances = [i.start(settings) for i in indices]

    all_instances = [*extractors_instances, *indices_instances]

    sites = SiteManager.sort_files_by_site_adapt(context)

    print_extractors(context)
    print_indices(context)

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
    tw.extractors = all_instances

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

        aggregated_data = list(np.mean(interval_data, axis=0))

        AggregatedManager.to_storage(
            context=context,
            band=band,
            integration=timeline.integration,
            extractor=extractor,
            data=aggregated_data,
            timeline=timeline,
            interval_details=interval_details,
            interval=interval,
            labels=labels,
        )

    print_action("Extractions and aggregations completed!", "end")
