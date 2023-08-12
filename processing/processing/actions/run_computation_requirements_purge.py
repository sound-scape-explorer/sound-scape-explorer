from rich import print

from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


def run_computation_requirements_purge(
    storage: Storage,
    callback: IMain,
):
    storage.delete(StoragePath.computation_umap)
    storage.delete(StoragePath.mean_distances_matrix)

    print("[bold green]:rocket: Computation requirements purged![/bold green]")
    callback(storage)
