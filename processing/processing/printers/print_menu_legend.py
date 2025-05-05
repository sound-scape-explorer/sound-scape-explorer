from rich import print

from processing.constants import STATE_MISSING, STATE_PRESENT, STATE_UNDEFINED


def print_menu_legend():
    print("State in storage:")
    print(f"[red]{STATE_MISSING} Missing[/red]")
    print(f"[green]{STATE_PRESENT} Present[/green]")
    print(f"[white]{STATE_UNDEFINED} Not configured[/white]")
    print()

    print(
        "[yellow]"
        "⚠️ Remember to [b]Quit[/b] before loading file into the visualisation module"
        "[/yellow]"
    )
    print()
