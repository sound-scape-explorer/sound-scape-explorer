from rich.progress import track

from processing.common.AggregatedLabelStorage import AggregatedLabelStorage
from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.config.bands.BandStorage import BandStorage
from processing.config.digesters.DigesterStorage import DigesterStorage
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.filter_nn_extractors import filter_nn_extractors
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.print_digesters import print_digesters
from processing.utils.validate_autoclustered import validate_autoclustered
from processing.utils.validate_configuration import validate_configuration
from processing.utils.validate_digesters import validate_digesters


@validate_configuration
@validate_digesters
@validate_autoclustered
def digest(
    storage: Storage,
    callback: MenuCallback,
):
    print_action("Digestions started!", "start")

    storage.delete(StoragePath.digested)

    digesters = DigesterStorage.read_from_storage(storage)
    print_digesters(digesters)

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    extractors = ExtractorStorage.read_from_storage(storage)
    nn_extractors = filter_nn_extractors(extractors)
    aggregated_reduceables = AggregatedReduceable.reconstruct(
        bands=bands,
        integrations=integrations,
        nn_extractors=nn_extractors,
    )

    for ar in aggregated_reduceables:
        aggregated_features = ar.read_features_from_storage(storage)
        aggregated_labels = AggregatedLabelStorage.read_from_storage(
            storage=storage,
            band=ar.band,
            integration=ar.integration,
            extractor=ar.extractor,
        )

        for digester in track(digesters):
            d = digester.instantiate()
            d.features = aggregated_features
            d.labels = aggregated_labels
            d.storage = storage
            d.band = ar.band
            d.integration = ar.integration

            for data, label_a, label_b in d.walk_labels():
                path = (
                    f"{StoragePath.digested.value}"
                    f"/{ar.band.name}"
                    f"/{ar.integration.seconds}"
                    f"/{digester.index}"
                    f"/{label_a.index}"
                )

                attributes = {
                    "digester_name": digester.name,
                    "label_a_property": label_a.property,
                    "label_a_index": str(label_a.index),
                }

                if label_b is not None:
                    path = f"{path}/{label_b.index}"

                    attributes = {
                        **attributes,
                        **{
                            "label_b_property": label_b.property,
                            "label_b_index": str(label_b.index),
                        },
                    }

                storage.write(
                    path=path,
                    data=data,
                    compression=True,
                    attributes=attributes,
                )

    print_action("Digestions completed!", "end")
    invoke_menu(storage, callback)
