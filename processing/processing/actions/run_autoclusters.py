from processing.context import Context
from processing.errors.MeanDistancesMatrixEmptyWarning import (
    MeanDistancesMatrixEmptyWarning,
)
from processing.new.AutoclusteredManager import AutoclusteredManager
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.new.iterate_extractors import iterate_extractors
from processing.utils.is_mdm_empty import is_mdm_empty
from processing.utils.print_action import print_action
from processing.utils.print_autoclusters import print_autoclusters
from processing.utils.validate_autoclusters import validate_autoclusters
from processing.utils.validate_configuration import validate_configuration
from processing.utils.validate_mean_distances_matrix import (
    validate_mean_distances_matrix,
)


@validate_configuration
@validate_mean_distances_matrix
@validate_autoclusters
def run_autoclusters(context: Context):
    print_action("Autoclustering started!", "start")

    AutoclusteredManager.delete(context)

    print_autoclusters(context)

    autoclusters = context.config.autoclusters

    for e in iterate_extractors(context):
        mdm = MeanDistancesMatrixManager.from_storage(
            context.storage,
            e.band,
            e.integration,
            e.extractor,
        )

        if is_mdm_empty(mdm):
            MeanDistancesMatrixEmptyWarning(e.band, e.integration, e.extractor)
            continue

        for autocluster in autoclusters:
            autocluster.start()
            autocluster.calculate(mdm)

            AutoclusteredManager.to_storage(
                context=context,
                band=e.band,
                integration=e.integration,
                extractor=e.extractor,
                autocluster=autocluster,
            )

    print_action("Autoclustering completed!", "end")
