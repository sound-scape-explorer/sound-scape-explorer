from rich.progress import track

from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.DigestedManager import DigestedManager
from processing.new.LabelFusionAdapter import LabelFusionAdapter
from processing.new.iterate_extractors import iterate_extractors
from processing.utils.print_action import print_action
from processing.utils.print_digesters import print_digesters
from processing.utils.validate_configuration import validate_configuration
from processing.utils.validate_digesters import validate_digesters


@validate_configuration
@validate_digesters
def run_digestions(context: Context):
    print_action("Digestions started!", "start")
    print_digesters(context)

    DigestedManager.delete(context)

    digesters = context.config.digesters

    for e in iterate_extractors(context):
        aggregated = AggregatedManager.from_storage(
            context,
            e.band,
            e.integration,
            e.extractor,
        )

        fused_labels = LabelFusionAdapter.from_storage(
            context,
            e.band,
            e.integration,
            e.extractor,
        )

        for digester in track(digesters):
            d = digester.start()
            d.features = aggregated.data
            d.labels = fused_labels
            d.storage = context.storage
            d.band = e.band
            d.integration = e.integration
            d.extractor = e.extractor

            for data, label_a, label_b in d.walk_labels():
                DigestedManager.to_storage(
                    context=context,
                    band=e.band,
                    integration=e.integration,
                    extractor=e.extractor,
                    digester=d,
                    data=data,
                    label_a=label_a,
                    label_b=label_b,
                )

    print_action("Digestions completed!", "end")
