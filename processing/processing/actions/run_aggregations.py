from processing.common.Timeline import Timeline
from processing.context import Context
from processing.lib.console import Console
from processing.lib.validate import Validate
from processing.managers.ExtractionManager import ExtractionManager
from processing.managers.SiteManager import SiteManager
from processing.repositories.AggregationRepository import AggregationRepository
from processing.services.SiteService import SiteService
from processing.validators.validate_extractions import validate_extractions


@validate_extractions
def run_aggregations(context: Context):
    Console.print_header("Aggregations started")

    AggregationRepository.delete(context)

    sites = SiteService.get_sites(context)
    extractions = context.config.extractions

    for si in SiteManager.iterate(sites, extractions):
        Console.print_site_iteration(si)

        timeline = Timeline(context)

        for extracted_by_extractor_index in ExtractionManager.read(
            context,
            si.band,
            si.extraction,
            si.site,
        ):
            timeline.add(extracted_by_extractor_index)

        for integration in si.extraction.integrations:
            is_valid = Validate.extraction_vs_integration(
                si.extraction,
                integration,
            )

            if not is_valid:
                Console.print_warning("skipping")
                continue

            aggregates = timeline.aggregate(integration.duration)

            AggregationRepository.to_storage(
                context=context,
                extraction=si.extraction,
                band=si.band,
                integration=integration,
                site=si.site,
                aggregates=aggregates,
            )

    Console.print_footer("Aggregations completed")
