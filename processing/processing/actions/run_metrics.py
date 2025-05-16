import numpy as np
from rich.progress import track

from processing.context import Context
from processing.factories.MetricFactory import MetricFactory
from processing.managers.AggregationManager import AggregationManager
from processing.printers.print_action import print_action
from processing.printers.print_metrics import print_metrics
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixRepository,
)
from processing.repositories.MetricRepository import MetricRepository
from processing.services.AggregatedTagService import AggregatedTagService
from processing.validators.validate_aggregated import validate_aggregated


@validate_aggregated
def run_metrics(context: Context):
    print_action("Metrics started!", "start")

    MetricRepository.delete(context)

    for ai in AggregationManager.iterate(context):
        print_metrics(ai.extraction.metrics)

        aggregations = AggregationRepository.from_storage(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
        )

        embeddings = np.stack([a.embeddings for a in aggregations])

        aggregated_tags = AggregatedTagService.from_storage(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
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
                tags=aggregated_tags,
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

    print_action("Metrics completed!", "end")
