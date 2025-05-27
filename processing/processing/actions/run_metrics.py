import numpy as np
from rich.progress import track

from processing.context import Context
from processing.factories.MetricFactory import MetricFactory
from processing.lib.console import Console
from processing.managers.AggregationManager import AggregationManager
from processing.services.TagService import TagService
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixRepository,
)
from processing.repositories.MetricRepository import MetricRepository
from processing.validators.validate_aggregations import validate_aggregations


@validate_aggregations
def run_metrics(context: Context):
    Console.print_header("Metrics started")

    MetricRepository.delete(context)

    for ai in AggregationManager.iterate(context):
        Console.print_metrics(ai.extraction.metrics)

        aggregations = AggregationRepository.from_storage(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
        )

        embeddings = np.stack([a.embeddings for a in aggregations])

        tags = TagService.build_serialized_tags(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
            aggregations=aggregations,
        )

        mdm = MeanDistancesMatrixRepository.from_storage(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
            trim_half=True,
        )

        for metric in track(ai.extraction.metrics):
            m = MetricFactory.create(
                metric=metric,
                embeddings=embeddings,
                tags=tags,
                mdm=mdm,
            )

            data = m.run()

            MetricRepository.to_storage(
                context=context,
                extraction=ai.extraction,
                band=ai.band,
                integration=ai.integration,
                metric=metric,
                data=data,
            )

    Console.print_footer("Metrics completed")
