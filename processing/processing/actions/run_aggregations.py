from rich import print

from processing.common.Timeline import Timeline
from processing.context import Context
from processing.lib.validation import (
    validate_extraction_against_integration,
)
from processing.managers.ExtractionManager import ExtractionManager
from processing.printers.print_action import print_action
from processing.printers.print_warning import print_warning
from processing.repositories.AggregatedRepository import AggregatedRepository
from processing.services.SiteService import SiteService
from processing.validators.validate_extracted import validate_extracted


@validate_extracted
def run_aggregations(context: Context):
    print_action("Aggregations started!", "start")

    AggregatedRepository.delete(context)

    sites = SiteService.get_sites(context)
    extractions = context.config.extractions

    for site in sites:
        for extraction in extractions:
            for band in extraction.bands:
                print(
                    f"Building timeline for [b]{site.name}[/b]."
                    f" Band: [b]{band.name}[/b]."
                    f" Files count: {len(site.files)}"
                )

                timeline = Timeline(context)

                for extracted_by_extractor_index in ExtractionManager.read(
                    context,
                    band,
                    extraction,
                    site,
                ):
                    timeline.add(extracted_by_extractor_index)

                for integration in extraction.integrations:
                    is_valid = validate_extraction_against_integration(
                        extraction, integration
                    )

                    if not is_valid:
                        print_warning("skipping")
                        continue

                    all_aggregated = timeline.aggregate(integration.duration)

                    AggregatedRepository.to_storage(
                        context=context,
                        extraction=extraction,
                        band=band,
                        integration=integration,
                        site=site,
                        all_aggregated=all_aggregated,
                    )

    print_action("Aggregations completed!", "end")
