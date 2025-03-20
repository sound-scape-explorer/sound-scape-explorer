from rich.progress import track

from processing.common.AggregatedLabelStorage import AggregatedLabelStorage
from processing.common.AggregatedReducible import AggregatedReducible
from processing.context import Context
from processing.new.DigestedManager import DigestedManager
from processing.utils.print_action import print_action
from processing.utils.print_digesters import print_digesters
from processing.utils.validate_configuration import validate_configuration
from processing.utils.validate_digesters import validate_digesters


@validate_configuration
@validate_digesters
def digest(context: Context):
    print_action("Digestions started!", "start")
    print_digesters(context)

    DigestedManager.delete(context)

    digesters = context.config.digesters

    storage = context.storage
    bands = context.config.bands
    integrations = context.config.integrations
    extractors = context.config.extractors

    reducibles = AggregatedReducible.reconstruct(
        bands=bands,
        integrations=integrations,
        extractors=extractors,
    )

    for reducible in reducibles:
        aggregated_features = reducible.read_features_from_storage(storage)
        aggregated_labels = AggregatedLabelStorage.read_from_storage(
            context=context,
            reducible=reducible,
        )

        for digester in track(digesters):
            d = digester.start()
            d.features = aggregated_features
            d.labels = aggregated_labels
            d.storage = storage
            d.band = reducible.band
            d.integration = reducible.integration

            for data, label_a, label_b in d.walk_labels():
                DigestedManager.to_storage(
                    context=context,
                    reducible=reducible,
                    digester=d,
                    data=data,
                    label_a=label_a,
                    label_b=label_b,
                )

    print_action("Digestions completed!", "end")
