from processing.context import Context
from processing.errors.MeanDistancesMatrixEmptyWarning import (
    MeanDistancesMatrixEmptyWarning,
)
from processing.new.AutoclusteredManager import AutoclusteredManager
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.utils.is_mdm_empty import is_mdm_empty
from processing.utils.print_action import print_action
from processing.utils.print_autoclusters import print_autoclusters
from processing.utils.validate_autoclusters import validate_autoclusters
from processing.utils.validate_configuration import validate_configuration
from processing.utils.validate_mean_distances_matrix import (
    validate_mean_distances_matrix,
)
from processing.utils.walk_bands_integrations import walk_bands_integrations


@validate_configuration
@validate_mean_distances_matrix
@validate_autoclusters
def autocluster(context: Context):
    print_action("Autoclustering started!", "start")

    AutoclusteredManager.delete(context)

    print_autoclusters(context)

    storage = context.storage
    bands = context.config.bands
    integrations = context.config.integrations
    autoclusters = context.config.autoclusters

    for band, integration in walk_bands_integrations(bands, integrations):
        for ac in autoclusters:
            ac.create_instance(band, integration)
            mdm = MeanDistancesMatrixManager.read_from_storage(
                storage,
                band,
                integration,
            )

            if is_mdm_empty(mdm):
                MeanDistancesMatrixEmptyWarning(band, integration)
                continue

            ac.calculate(mdm)
            AutoclusteredManager.to_storage(
                context=context,
                band=band,
                integration=integration,
                ac=ac,
            )

    print_action("Autoclustering completed!", "end")
