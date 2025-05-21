from processing.context import Context
from processing.errors.MeanDistancesMatrixEmptyWarning import (
    MeanDistancesMatrixEmptyWarning,
)
from processing.managers.AggregationManager import AggregationManager
from processing.printers.print_action import print_action
from processing.printers.print_autoclusters import print_autoclusters
from processing.repositories.AutoclusterRepository import AutoclusterRepository
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixRepository,
)
from processing.utils.is_mdm_empty import is_mdm_empty


def run_autoclusters(context: Context):
    print_action("Autoclustering started!", "start")

    AutoclusterRepository.delete(context)

    for ai in AggregationManager.iterate(context):
        print_autoclusters(ai.extraction.autoclusters)

        mdm = MeanDistancesMatrixRepository.from_storage(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
        )

        if is_mdm_empty(mdm):
            MeanDistancesMatrixEmptyWarning(ai.extraction, ai.band, ai.integration)
            continue

        for autocluster in ai.extraction.autoclusters:
            data = autocluster.run(mdm)

            AutoclusterRepository.to_storage(
                context=context,
                extraction=ai.extraction,
                band=ai.band,
                integration=ai.integration,
                autocluster=autocluster,
                data=data,
            )

    print_action("Autoclustering completed!", "end")
