from signal import SIGINT, signal
from typing import Optional

from rich.console import Console

from processing.actions.autocluster import autocluster
from processing.actions.compute_requirements import compute_requirements
from processing.actions.digest import digest
from processing.actions.export_dataframe import export_dataframe
from processing.actions.extract_and_aggregate import extract_and_aggregate
from processing.actions.purge_requirements import purge_requirements
from processing.actions.reduce import reduce
from processing.actions.refresh_configuration import refresh_configuration
from processing.actions.repack_storage import repack_storage
from processing.actions.trace_trajectories import trace_trajectories
from processing.storage.Storage import Storage
from processing.utils.ask_menu import MenuChoice, ask_menu
from processing.utils.get_yaml_data import get_yaml_data
from processing.utils.print_yaml_env import print_yaml_env
from processing.utils.quit_sse import quit_sse
from processing.utils.update_python_path import update_python_path


def main(
    loaded_storage: Optional[Storage] = None,
):
    """CLI entry point"""

    try:
        update_python_path()

        env = get_yaml_data()

        if loaded_storage is None:
            print_yaml_env(env)
            storage = Storage(env.storage)
        else:
            storage = loaded_storage

        signal(SIGINT, lambda _signum, _frame: quit_sse(storage))

        answer = ask_menu()

        if answer == MenuChoice.RefreshConfig.value:
            refresh_configuration(env, storage, main)
        if answer == MenuChoice.ExtractAggregate.value:
            extract_and_aggregate(storage, main)
        if answer == MenuChoice.Reduce.value:
            reduce(storage, main)
        if answer == MenuChoice.ComputeRequirements.value:
            compute_requirements(storage, main)
        if answer == MenuChoice.PurgeRequirements.value:
            purge_requirements(storage, main)
        if answer == MenuChoice.Autocluster.value:
            autocluster(storage, main)
        if answer == MenuChoice.Trace.value:
            trace_trajectories(storage, main)
        if answer == MenuChoice.Digest.value:
            digest(storage, main)
        if answer == MenuChoice.RunAll.value:
            refresh_configuration(env, storage)
            extract_and_aggregate(storage)
            reduce(storage)
            compute_requirements(storage)
            autocluster(storage)
            trace_trajectories(storage)
            digest(storage, main)
        if answer == MenuChoice.ExportDataframe.value:
            export_dataframe(env, storage, main)
        if answer == MenuChoice.Repack.value:
            repack_storage(storage, main)
        else:
            quit_sse(storage)
    except Exception:
        console = Console()
        console.print_exception(show_locals=True)


if __name__ == "__main__":
    main()
