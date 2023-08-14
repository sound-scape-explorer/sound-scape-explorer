from typing import Literal

from rich import print


def print_action(
    payload: str,
    mode: Literal["start", "end", "error"],
) -> None:
    print()

    if mode == "start":
        print(f"[bold yellow]:rocket: {payload}[/bold yellow]")
    if mode == "end":
        print(f"[bold green]:party_popper: {payload}[/bold green]")
    if mode == "error":
        print(f"[red bold]:collision: {payload}[/red bold]")

    print()
