from processing.context import Context
from processing.factories.AutoclusterFactory import AutoclusterFactory
from processing.lib.console import Console
from processing.managers.AggregationManager import AggregationManager
from processing.repositories.AutoclusterRepository import AutoclusterRepository
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixRepository,
)
from processing.utils.is_mdm_empty import is_mdm_empty


def run_autoclusters(context: Context):
    Console.print_header("Autoclustering started")

    AutoclusterRepository.delete(context)

    for ai in AggregationManager.iterate(context):
        Console.print_autoclusters(ai.extraction.autoclusters)

        mdm = MeanDistancesMatrixRepository.from_storage(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
        )

        if is_mdm_empty(mdm):
            Console.print_mdm_empty_warning(ai.extraction, ai.band, ai.integration)
            continue

        for autocluster in ai.extraction.autoclusters:
            labels = AutoclusterFactory.create_and_run(autocluster, mdm)

            AutoclusterRepository.to_storage(
                context=context,
                extraction=ai.extraction,
                band=ai.band,
                integration=ai.integration,
                autocluster=autocluster,
                labels=labels,
            )

    Console.print_header("Autoclustering completed")
