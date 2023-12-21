from InquirerPy.base import Choice

from processing.common.AggregatedStorage import AggregatedStorage
from processing.common.AutoclusteredStorage import AutoclusteredStorage
from processing.common.MenuChoice import MenuChoice
from processing.common.RelativeTracedStorage import RelativeTracedStorage
from processing.common.TracedStorage import TracedStorage
from processing.config.Config import Config
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


def wrap_menu_choice_with_state(
    menu_choice: MenuChoice,
    storage: Storage,
) -> Choice:
    state = False

    if menu_choice is MenuChoice.RefreshConfig:
        state = Config.exists_in_storage(storage)
    elif menu_choice is MenuChoice.ExtractAggregate:
        state = AggregatedStorage.exists(storage)
    elif menu_choice is MenuChoice.Reduce:
        state = storage.exists_dataset(StoragePath.reduced)
    elif menu_choice is MenuChoice.ComputeRequirements:
        state = storage.exists_dataset(
            StoragePath.computation_umap
        ) and storage.exists_dataset(StoragePath.mean_distances_matrix)
    elif menu_choice is MenuChoice.Autocluster:
        state = AutoclusteredStorage.exists(storage)
    elif menu_choice is MenuChoice.Trace:
        state = TracedStorage.exists(storage)
    elif menu_choice is MenuChoice.RelativeTrace:
        state = RelativeTracedStorage.exists(storage)
    elif menu_choice is MenuChoice.Digest:
        state = storage.exists_dataset(StoragePath.digested)

    if state:
        return Choice(value=menu_choice.value, name=f"✅ {menu_choice.value}")
    else:
        return Choice(value=menu_choice.value, name=f"❌ {menu_choice.value}")
