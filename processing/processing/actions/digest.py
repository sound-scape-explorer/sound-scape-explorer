from typing import Optional

from rich.progress import track

from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.digesters.DigesterStorage import DigesterStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import IMain
from processing.storage.AggregatedLabelStorage import AggregatedLabelStorage
from processing.storage.AggregatedReduceableStorage import AggregatedReduceableStorage
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
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

    storage.delete(StoragePath.digested)
    digesters = DigesterStorage.read_from_storage(storage)

    if len(digesters) == 0:
        if callback is not None:
            callback(storage)
        return

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    aggregated_reduceables = AggregatedReduceableStorage.read_from_storage(
        storage=storage,
        bands=bands,
        integrations=integrations,
    )

    for ar in aggregated_reduceables:
        aggregated_features = ar.read_features_from_storage(storage)
        aggregated_labels = AggregatedLabelStorage.read_from_storage(
            storage=storage,
            band=ar.band,
            integration=ar.integration,
        )

        for digester in track(digesters):
            d = digester.instanciate()
            d.features = aggregated_features

            for label in aggregated_labels:
                d.label = label
                data = d.digest()

                path = (
                    f"{StoragePath.digested.value}"
                    f"/{ar.band.name}"
                    f"/{ar.integration.seconds}"
                    f"/{digester.index}"
                    f"/{label.index}"
                )

                storage.write(
                    path=path,
                    data=data,
                    compression=True,
                    attributes={
                        "digester_name": digester.name,
                        "label_property": label.property,
                        "label_index": str(label.index),
                    },
                )

    if callback is not None:
        callback(storage)
