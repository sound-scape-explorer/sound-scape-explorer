from rich import print


def print_menu_legend():
    print("State in storage:")
    print("[red]❌ Missing[/red]")
    print("[green]✅ Present[/green]")
    print()

    print(
        "[yellow]"
        "⚠️ Remember to [b]Quit[/b] before loading file into the visualisation module"
        "[/yellow]"
    )
    print()
