from typing import Optional

from processing.common.ComputationUmapStorage import ComputationUmapStorage
from processing.common.RelativeTracedStorage import RelativeTracedStorage
from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.print_action import print_action
from processing.utils.print_no_configuration import print_no_configuration
from processing.utils.print_trajectories import print_trajectories


def trace_relative_trajectories(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    print_action("Tracing relative trajectories started!", "start")

    RelativeTracedStorage.delete(storage)

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    trajectories = TrajectoryStorage.read_from_storage(storage)
    print_trajectories(trajectories)

    # 1. iterate through bands
    # 2. iterate through integrations
    # 3. pack trajectories into relative trajectories (using common reference)
    # 4. iterate through computation umaps
    # 5. iterate through relative trajectories packs
    # 6. compute the starting point
    # 7. compute the nearest neighbours
    # 8. compute the mean distance of the nearest neighbours
    # 9. iterate through relative trajectories within the pack
    # 10. compute the relative distances
    # 11. divide the relative distances by the mean distance from nearest neighbours
    # 12. add to the relative distance array for the given pack
    # 13. median this

    for band in bands:
        for integration in integrations:
            computation_umap_group = ComputationUmapStorage.read_from_storage(
                storage=storage,
                band=band,
                integration=integration,
            )

    print_action("Tracing relative trajectories completed!", "end")

    if callback is not None:
        callback(storage)
