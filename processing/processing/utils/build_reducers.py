from typing import List

from processing.config.bands.BandStorage import BandStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.storage.Storage import Storage


def read_reducers(
    storage: Storage,
) -> List[ReducerConfig]:
    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    ranges = RangeStorage.read_from_storage(storage)
    reducers = ReducerStorage.read_from_storage(storage, bands, integrations, ranges)
    return reducers
