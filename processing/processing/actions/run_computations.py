from rich import print
from rich.progress import track

from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.ComputedManager import ComputedManager
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.new.SettingsConfigNew import ComputationStrategy
from processing.new.iterate_extractors import iterate_extractors
from processing.printers.print_action import print_action
from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.UmapReducer import UmapReducer
from processing.validators.validate_aggregated import validate_aggregated
from processing.validators.validate_autoclusters import validate_autoclusters
from processing.validators.validate_configuration import validate_configuration


def _compute_umap(context: Context):
    print(
        f"Computing UMAPs..."
        f" (iterations: {context.config.settings.computation_iterations},"
        f" dimensions: {context.config.settings.computation_dimensions})"
    )

    for e in iterate_extractors(context):
        aggregated = AggregatedManager.from_storage(
            context,
            e.band,
            e.integration,
            e.extractor,
        )

        for iteration in track(
            range(context.config.settings.computation_iterations),
            description=f"Band {e.band.name}, integration {e.integration.name}",
        ):
            umap = UmapReducer(min_dist=0)
            umap.load(
                dimensions=context.config.settings.computation_dimensions,
                seed=None,
                features=aggregated.data,
            )

            computed = umap.calculate()

            ComputedManager.to_storage(
                context=context,
                band=e.band,
                integration=e.integration,
                extractor=e.extractor,
                iteration=iteration,
                data=computed,
            )


def _compute_pca(context: Context):
    print(
        f"Computing PCAs..."
        f" (iterations: {context.config.settings.computation_iterations},"
        f" dimensions: {context.config.settings.computation_dimensions})"
    )

    for e in iterate_extractors(context):
        aggregated = AggregatedManager.from_storage(
            context,
            e.band,
            e.integration,
            e.extractor,
        )

        for iteration in track(
            range(context.config.settings.computation_iterations),
            description=f"Band {e.band.name}, integration {e.integration.name}",
        ):
            pca = PcaReducer()
            pca.load(
                dimensions=context.config.settings.computation_dimensions,
                seed=None,
                features=aggregated.data,
            )

            computed = pca.calculate()

            ComputedManager.to_storage(
                context=context,
                band=e.band,
                integration=e.integration,
                extractor=e.extractor,
                iteration=iteration,
                data=computed,
            )


def _compute_embeddings(context: Context):
    print("Using primary embeddings...")

    for e in iterate_extractors(context):
        aggregated = AggregatedManager.from_storage(
            context,
            e.band,
            e.integration,
            e.extractor,
        )

        ComputedManager.to_storage(
            context=context,
            band=e.band,
            integration=e.integration,
            extractor=e.extractor,
            iteration=0,
            data=aggregated.data[:],
        )


@validate_configuration
@validate_autoclusters
@validate_aggregated
def run_computations(context: Context):
    print_action("Requirements computation started!", "start")

    ComputedManager.delete(context)

    if context.config.settings.computation_strategy is ComputationStrategy.umap:
        _compute_umap(context)
    elif context.config.settings.computation_strategy is ComputationStrategy.pca:
        _compute_pca(context)
    elif context.config.settings.computation_strategy is ComputationStrategy.embeddings:
        _compute_embeddings(context)

    MeanDistancesMatrixManager.delete(context.storage)
    print()
    print("Computing mean distances matrix...")

    for e in iterate_extractors(context):
        computed = ComputedManager.from_storage(
            context,
            e.band,
            e.integration,
            e.extractor,
        )

        mdm = MeanDistancesMatrixManager.calculate(
            features=computed,
            settings=context.config.settings,
        )

        MeanDistancesMatrixManager.to_storage(
            storage=context.storage,
            band=e.band,
            integration=e.integration,
            extractor=e.extractor,
            data=mdm,
        )

    print_action("Requirements computation completed!", "end")
