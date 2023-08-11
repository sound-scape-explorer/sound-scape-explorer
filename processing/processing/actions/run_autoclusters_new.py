from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.config.Config import Config
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.print_autoclusters import print_autoclusters
from processing.utils.print_no_configuration import print_no_configuration
from processing.utils.print_trajectories import print_trajectories


def run_autoclusters_new(
    storage: Storage,
    callback: IMain,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        callback(storage)
        return

    # Verify for computation UMAPs
    storage.delete(StoragePath.autoclustered)

    autoclusters = AutoclusterStorage.read_from_storage(storage)
    trajectories = TrajectoryStorage.read_from_storage(storage)

    print_autoclusters(autoclusters)
    print_trajectories(trajectories)

    callback(storage)
