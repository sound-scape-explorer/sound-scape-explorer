from rich import print

from processing.constants import APP_NAME
from processing.lib.app import App


def print_welcome() -> None:
    version = App.get_version()

    print(
        f"[green]"
        f":waving_hand: Welcome to [bold]{APP_NAME}[/bold]"
        f" "
        f"[italic]v{version}[/italic]"
        f"[/green]"
    )
    print()
