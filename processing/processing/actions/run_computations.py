from rich import print
from rich.progress import track

from processing.context import Context
from processing.enums import ComputationStrategyEnum
from processing.repositories.AggregatedRepository import AggregatedRepository
from processing.managers.AggregationManager import AggregationManager
from processing.repositories.ComputedRepository import ComputedRepository
from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.repositories.MeanDistancesMatrixRepository import MeanDistancesMatrixRepository
from processing.printers.print_action import print_action
from processing.reducers.PcaReducerNew import PcaReducerNew
from processing.reducers.UmapReducerNew import UmapReducerNew
from processing.validators.validate_aggregated import validate_aggregated


def _run_computation_reductions(context: Context):
    print(
        f"Running computation reductions with [b]{context.config.settings.computation_strategy.value}[/b]..."
        f" (iterations: {context.config.settings.computation_iterations},"
        f" dimensions: {context.config.settings.computation_dimensions})"
    )

    ComputedRepository.delete(context)

    for ai in AggregationManager.iterate(context):
        embeddings = AggregatedRepository.from_storage_embeddings(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
        )

        for iteration in track(
            range(context.config.settings.computation_iterations),
            description=f"Band {ai.band.name}, integration {ai.integration.name}",
        ):
            if (
                context.config.settings.computation_strategy
                is ComputationStrategyEnum.UMAP
            ):
                umap = UmapReducerNew(min_dist=0)
                reduced = umap.reduce(
                    embeddings=embeddings,
                    dimensions=context.config.settings.computation_dimensions,
                    seed=None,
                )
            elif (
                context.config.settings.computation_strategy
                is ComputationStrategyEnum.PCA
            ):
                pca = PcaReducerNew()
                reduced = pca.reduce(
                    embeddings=embeddings,
                    dimensions=context.config.settings.computation_dimensions,
                    seed=None,
                )
            elif (
                context.config.settings.computation_strategy
                is ComputationStrategyEnum.EMBEDDINGS
            ):
                reduced = embeddings
            else:
                raise Exception("Invalid computation strategy")

            ComputedRepository.to_storage(
                context=context,
                extraction=ai.extraction,
                band=ai.band,
                integration=ai.integration,
                iteration=iteration,
                data=reduced,
            )


def _run_mean_distance_matrices(context: Context):
    print("Computing mean distances matrix...")

    MeanDistancesMatrixRepository.delete(context.storage)

    for ai in AggregationManager.iterate(context):
        computed = ComputedRepository.from_storage(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
        )

        mdm = MeanDistancesMatrix.calculate(
            features=computed,
            settings=context.config.settings,
        )

        MeanDistancesMatrixRepository.to_storage(
            storage=context.storage,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
            data=mdm,
        )


@validate_aggregated
def run_computations(context: Context):
    print_action("Requirements computation started!", "start")

    _run_computation_reductions(context)

    print()

    _run_mean_distance_matrices(context)

    print_action("Requirements computation completed!", "end")
