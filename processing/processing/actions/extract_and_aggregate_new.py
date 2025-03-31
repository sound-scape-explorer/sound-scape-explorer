from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.ExtractedManager import ExtractedManager
from processing.new.SiteFileProcessor import SiteFileProcessor
from processing.new.SiteManager import SiteManager
from processing.printers.print_action import print_action
from processing.printers.print_extractors import print_extractors
from processing.printers.print_indices import print_indices


def extract_and_aggregate(context: Context):
    print_action("Extractions and aggregations started!", "start")

    ExtractedManager.delete(context)
    AggregatedManager.delete(context)

    settings = context.config.settings
    extractors = context.config.extractors
    extractors_instances = [ex.start(settings) for ex in extractors]
    indices = context.config.indices
    indices_instances = [i.start(settings) for i in indices]

    print_extractors(context)
    print_indices(context)

    sites = SiteManager.get_sites(context)

    for site_name in sites:
        processor = SiteFileProcessor(
            site=site_name,
            files=sites[site_name],
            context=context,
            extractors_instances=extractors_instances,
            indices_instances=indices_instances,
        )

        for payload in processor.walk():
            pass

            if payload.extractor.is_persist:
                pass

    print_action("Extractions and aggregations completed!", "end")
