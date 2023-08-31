from typing import List

from rich.console import Console
from rich.table import Table

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.storage.Storage import Storage


def print_aggregated_reduceables(
    ars: List[AggregatedReduceable],
    storage: Storage,
):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("From extractor")
    table.add_column("Band")
    table.add_column("Integration")
    table.add_column("Data in storage")

    for ar in ars:
        table.add_row(
            ar.extractor.name,
            ar.band.name,
            str(ar.integration.seconds),
            "[green]:heavy_check_mark:[/green]"
            if ar.exists_in_storage(storage)
            else "[red]:x:[/red]",
        )

    console.print(table)
