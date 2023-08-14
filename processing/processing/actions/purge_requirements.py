from typing import Optional

from rich.progress import track

from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.print_purge_requirements_end import print_purge_requirements_end
from processing.utils.print_purge_requirements_start import (
    print_purge_requirements_start,
)


def purge_requirements(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    print_purge_requirements_start()

    for _ in track(range(1)):
        storage.delete(StoragePath.computation_umap)
        storage.delete(StoragePath.mean_distances_matrix)

    print_purge_requirements_end()

    if callback is not None:
        callback(storage)
