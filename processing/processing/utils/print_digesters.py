from typing import List

from rich.console import Console
from rich.table import Table

from processing.config.digesters.DigesterConfig import DigesterConfig


def print_digesters(digesters: List[DigesterConfig]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Name")
    table.add_column("Digester")

    for digester in digesters:
        table.add_row(
            digester.name,
            DigesterConfig.digesters[digester.name].__name__,
        )

    console.print(table)
