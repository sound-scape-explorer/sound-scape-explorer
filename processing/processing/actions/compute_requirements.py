from rich import print
from rich.progress import track

from processing.common.AggregatedReducible import AggregatedReducible
from processing.common.ComputationUmapStorage import ComputationUmapStorage
from processing.context import Context
from processing.new.ComputedManager import ComputedManager
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.new.SettingsConfigNew import ComputationStrategy
from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.UmapReducer import UmapReducer
from processing.utils.print_action import print_action
from processing.utils.validate_aggregated import validate_aggregated
from processing.utils.validate_autoclusters import validate_autoclusters
from processing.utils.validate_configuration import validate_configuration
from processing.utils.walk_bands_integrations import walk_bands_integrations


def _compute_umap(
    context: Context,
    reducibles: list[AggregatedReducible],
):
    print(
        f"Computing UMAPs..."
        f" (iterations: {context.config.settings.computation_iterations},"
        f" dimensions: {context.config.settings.computation_dimensions})"
    )

    for reducible in reducibles:
        features = reducible.read_features_from_storage(context.storage)

        for iteration in track(
            range(context.config.settings.computation_iterations),
            description=f"Band {reducible.band.name}, integration {reducible.integration.name}",
        ):
            umap = UmapReducer(min_dist=0)
            umap.load(
                dimensions=context.config.settings.computation_dimensions,
                seed=None,
                features=features,
            )

            computed = umap.calculate()

            ComputedManager.to_storage(
                context=context,
                band=reducible.band,
                integration=reducible.integration,
                iteration=iteration,
                data=computed,
            )


def _compute_pca(
    context: Context,
    reducibles: list[AggregatedReducible],
):
    print(
        f"Computing PCAs..."
        f" (iterations: {context.config.settings.computation_iterations},"
        f" dimensions: {context.config.settings.computation_dimensions})"
    )

    for reducible in reducibles:
        features = reducible.read_features_from_storage(context.storage)

        for iteration in track(
            range(context.config.settings.computation_iterations),
            description=(
                f"Band {reducible.band.name}"
                f", integration {reducible.integration.name}"
            ),
        ):
            pca = PcaReducer()
            pca.load(
                dimensions=context.config.settings.computation_dimensions,
                seed=None,
                features=features,
            )

            computed = pca.calculate()

            ComputedManager.to_storage(
                context=context,
                band=reducible.band,
                integration=reducible.integration,
                iteration=iteration,
                data=computed,
            )


def _compute_embeddings(
    context: Context,
    reducibles: list[AggregatedReducible],
):
    print("Using primary embeddings...")

    for reducible in reducibles:
        features = reducible.read_features_from_storage(context.storage)

        ComputedManager.to_storage(
            context=context,
            band=reducible.band,
            integration=reducible.integration,
            iteration=0,
            data=features[:],
        )


@validate_configuration
@validate_autoclusters
@validate_aggregated
def compute_requirements(context: Context):
    print_action("Requirements computation started!", "start")

    ComputedManager.delete(context)

    storage = context.storage
    bands = context.config.bands
    integrations = context.config.integrations
    extractors = context.config.extractors

    reducibles = AggregatedReducible.reconstruct(
        bands=bands,
        integrations=integrations,
        extractors=extractors,
    )

    if context.config.settings.computation_strategy is ComputationStrategy.umap:
        _compute_umap(context, reducibles)
    elif context.config.settings.computation_strategy is ComputationStrategy.pca:
        _compute_pca(context, reducibles)
    elif context.config.settings.computation_strategy is ComputationStrategy.embeddings:
        _compute_embeddings(context, reducibles)

    # -------
    # - MDM -
    # -------
    MeanDistancesMatrixManager.delete(context.storage)
    print()
    print("Computing mean distances matrix...")

    for band, integration in walk_bands_integrations(bands, integrations):
        computed_data = ComputationUmapStorage.read_from_storage(
            storage=storage,
            band=band,
            integration=integration,
        )

        mdm = MeanDistancesMatrixManager.calculate(
            features=computed_data,
            settings=context.config.settings,
        )

        MeanDistancesMatrixManager.to_storage(
            storage=storage,
            band=band,
            integration=integration,
            data=mdm,
        )

    print_action("Requirements computation completed!", "end")
