from rich import print

from processing.constants import APP_NAME
from processing.utils.get_version_from_setup import get_version_from_setup


def print_welcome() -> None:
    version = get_version_from_setup()
    print(
        f"[green]"
        f":waving_hand: Welcome to [bold]{APP_NAME}[/bold]"
        f" "
        f"[italic]v{version}[/italic]"
        f"[/green]"
    )
    print()
