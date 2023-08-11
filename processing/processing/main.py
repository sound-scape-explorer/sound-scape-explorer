from signal import SIGINT, signal
from typing import Optional

from rich.console import Console

from processing.actions.run_config import run_config
from processing.actions.run_extractions import run_extractions
from processing.actions.run_reductions import run_reductions
from processing.actions.run_repack import run_repack
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
            run_config(env, storage, main)
        if answer == MenuChoice.ExtractAggregate.value:
            run_extractions(storage, main)
        if answer == MenuChoice.Reduce.value:
            run_reductions(storage, main)
        if answer == MenuChoice.Repack.value:
            run_repack(storage, main)
        else:
            quit_sse(storage)
    except Exception:
        console = Console()
        console.print_exception(show_locals=True)


if __name__ == "__main__":
    main()
