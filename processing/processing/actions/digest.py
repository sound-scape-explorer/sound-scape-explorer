from typing import Optional

from rich import print

from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.digesters.DigesterStorage import DigesterStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import IMain
from processing.storage.AggregatedLabelStorage import AggregatedLabelStorage
from processing.storage.Storage import Storage
from processing.utils.print_labels import print_labels
from processing.utils.print_no_configuration import print_no_configuration
from processing.utils.walk_bands_integrations import walk_bands_integrations


def digest(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    digesters = DigesterStorage.read_from_storage(storage)

    if len(digesters) == 0:
        if callback is not None:
            callback(storage)
        return

    print(digesters)

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)

    for band, integration in walk_bands_integrations(bands, integrations):
        aggregated_labels = AggregatedLabelStorage.read_from_storage(
            storage=storage,
            band=band,
            integration=integration,
        )

        print_labels(aggregated_labels)

    if callback is not None:
        callback(storage)
