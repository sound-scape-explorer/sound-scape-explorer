from rich import print
from rich.progress import track

from processing.common.AggregatedReducible import AggregatedReducible
from processing.common.ComputationUmapStorage import ComputationUmapStorage
from processing.context import Context
from processing.new.ComputedManager import ComputedManager
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.reducers.UmapReducer import UmapReducer
from processing.utils.print_action import print_action
from processing.utils.validate_aggregated import validate_aggregated
from processing.utils.validate_autoclusters import validate_autoclusters
from processing.utils.validate_configuration import validate_configuration
from processing.utils.walk_bands_integrations import walk_bands_integrations


@validate_configuration
@validate_autoclusters  # skipping computing if no autoclusters are requested
@validate_aggregated
def compute_requirements(context: Context):
    # TODO: Add check for aggregated data

    print_action("Requirements computation started!", "start")

    ComputedManager.delete(context)

    storage = context.storage
    settings = context.config.settings
    bands = context.config.bands
    integrations = context.config.integrations
    extractors = context.config.extractors

    reducibles = AggregatedReducible.reconstruct(
        bands=bands,
        integrations=integrations,
        nn_extractors=extractors,
    )

    print(
        f"Computing UMAPs..."
        f" (iterations: {settings.computation_iterations},"
        f" dimensions: {settings.computation_dimensions})"
    )

    for ar in reducibles:
        features = ar.read_features_from_storage(storage)

        for computed_index in track(
            range(settings.computation_iterations),
            description=f"Band {ar.band.name}, integration {ar.integration.name}",
        ):
            umap = UmapReducer(min_dist=0)
            umap.load(
                dimensions=settings.computation_dimensions,
                seed=None,
                features=features,
            )

            computed_features = umap.calculate()

            ComputedManager.to_storage(
                context=context,
                ar=ar,
                index=computed_index,
                data=computed_features,
            )

    MeanDistancesMatrixManager.delete(context.storage)
    print()
    print("Computing mean distances matrix...")

    for band, integration in walk_bands_integrations(bands, integrations):
        computed_data = ComputationUmapStorage.read_from_storage(
            storage=storage,
            band=band,
            integration=integration,
        )

        mdm = MeanDistancesMatrixManager.calculate(features=computed_data)

        MeanDistancesMatrixManager.to_storage(
            storage=storage,
            band=band,
            integration=integration,
            data=mdm,
        )

    print_action("Requirements computation completed!", "end")
