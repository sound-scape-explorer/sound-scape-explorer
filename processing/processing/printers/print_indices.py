from rich.console import Console
from rich.table import Table

from processing.context import Context


def print_indices(context: Context):
    indices = context.config.indices

    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Index")
    table.add_column("Offset (ms)")
    table.add_column("Step (ms)")
    table.add_column("Persist (raw step data)")

    for index in indices:
        table.add_row(
            index.impl.name,
            str(index.offset),
            str(index.step),
            "[green]:heavy_check_mark:[/green]"
            if index.is_persist
            else "[red]:x:[/red]",
        )

    console.print(table)
