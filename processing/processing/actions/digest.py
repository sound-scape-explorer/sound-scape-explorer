from typing import Optional

from rich.progress import track

from processing.common.AggregatedLabelStorage import AggregatedLabelStorage
from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.digesters.DigesterStorage import DigesterStorage
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.filter_nn_extractors import filter_nn_extractors
from processing.utils.print_action import print_action
from processing.utils.print_digesters import print_digesters
from processing.utils.print_no_configuration import print_no_configuration


def digest(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    print_action("Digestions started!", "start")

    storage.delete(StoragePath.digested)
    digesters = DigesterStorage.read_from_storage(storage)

    if len(digesters) == 0:
        if callback is not None:
            callback(storage)
        return

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
            d = digester.instanciate()
            d.features = aggregated_features
            d.labels = aggregated_labels

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

    if callback is not None:
        callback(storage)
