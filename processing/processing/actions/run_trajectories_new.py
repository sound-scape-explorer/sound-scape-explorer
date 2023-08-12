from rich import print

from processing.config.Config import Config
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.print_no_configuration import print_no_configuration
from processing.utils.print_trajectories import print_trajectories


def run_trajectories_new(
    storage: Storage,
    callback: IMain,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        callback(storage)
        return

    storage.delete(StoragePath.trajectories)

    trajectories = TrajectoryStorage.read_from_storage(storage)

    print_trajectories(trajectories)

    print("[bold green]:rocket: Trajectories completed![/bold green]")
    callback(storage)
