import numpy as np
from rich.progress import track

from processing.context import Context
from processing.factories.MetricFactory import MetricFactory
from processing.managers.AggregationManager import AggregationManager
from processing.managers.TagManager import TagManager
from processing.printers.print_action import print_action
from processing.printers.print_metrics import print_metrics
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixRepository,
)
from processing.repositories.MetricRepository import MetricRepository
from processing.validators.validate_aggregations import validate_aggregations


@validate_aggregations
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

        tags = TagManager.build_serialized_tags(
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

    print_action("Metrics completed!", "end")
