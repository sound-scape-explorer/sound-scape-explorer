from rich.console import Console
from rich.table import Table

from processing.context import Context


def print_digesters(context: Context):
    digesters = context.config.digesters

    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Index")
    table.add_column("Digester")
    table.add_column("Is pairing")

    for digester in digesters:
        table.add_row(
            str(digester.index),
            digester.impl.name,
            "Yes" if digester.is_pairing else "No",
        )

    console.print(table)
