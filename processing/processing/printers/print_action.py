from typing import Literal

from rich import print


def print_action(
    payload: str,
    mode: Literal["start", "end", "error", "warning"],
) -> None:
    print()

    if mode == "start":
        print(f"[bold yellow]:rocket: {payload}[/bold yellow]")
    if mode == "end":
        print(f"[bold green]:party_popper: {payload}[/bold green]")
    if mode == "error":
        print(f"[bold red]:collision: {payload}[/bold red]")
    if mode == "warning":
        print(f"[yellow]:warning: {payload}[/yellow]")

    print()
