from rich import print
from rich.progress import track

from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.context import Context
from processing.enums import ComputationStrategy
from processing.lib.console import Console
from processing.managers.AggregationManager import AggregationManager
from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.UmapReducer import UmapReducer
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.ComputationRepository import ComputationRepository
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixRepository,
)
from processing.validators.validate_aggregations import validate_aggregations


def _run_computation_reductions(context: Context):
    strategy = context.config.settings.computation_strategy
    iterations = context.config.get_computation_iterations()
    dimensions = context.config.settings.computation_dimensions

    if strategy is ComputationStrategy.UMAP:
        print_details = f"(iterations: {iterations}, dimensions: {dimensions})"
    else:
        print_details = f"(iterations: {iterations})"

    Console.print(
        f"Running computation reductions with [b]{strategy.value}[/b]... {print_details}"
    )

    ComputationRepository.delete(context)

    for ai in AggregationManager.iterate(context):
        embeddings = AggregationRepository.from_storage_embeddings(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
        )

        for iteration in track(
            range(iterations),
            description=f"Band {ai.band.name}, integration {ai.integration.name}",
        ):
            if strategy is ComputationStrategy.UMAP:
                umap = UmapReducer(min_dist=0)
                reductions = umap.reduce(
                    embeddings=embeddings,
                    dimensions=context.config.settings.computation_dimensions,
                    seed=None,
                )
            elif strategy is ComputationStrategy.PCA:
                pca = PcaReducer()
                reductions = pca.reduce(
                    embeddings=embeddings,
                    dimensions=context.config.settings.computation_dimensions,
                    seed=None,
                )
            elif strategy is ComputationStrategy.EMBEDDINGS:
                reductions = embeddings
            else:
                raise Exception("Invalid computation strategy")

            ComputationRepository.to_storage(
                context=context,
                extraction=ai.extraction,
                band=ai.band,
                integration=ai.integration,
                iteration=iteration,
                data=reductions,
            )


def _run_mean_distance_matrices(context: Context):
    Console.print("Computing mean distances matrix...")

    MeanDistancesMatrixRepository.delete(context.storage)

    for ai in AggregationManager.iterate(context):
        computations = ComputationRepository.from_storage(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
        )

        mdm = MeanDistancesMatrix.calculate(
            embeddings=computations,
            settings=context.config.settings,
        )

        MeanDistancesMatrixRepository.to_storage(
            storage=context.storage,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
            data=mdm,
        )


@validate_aggregations
def run_computations(context: Context):
    Console.print_header("Requirements computation started")

    _run_computation_reductions(context)

    print()

    _run_mean_distance_matrices(context)

    Console.print_footer("Requirements computation completed")
