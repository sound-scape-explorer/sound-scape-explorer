from typing import List

from rich.console import Console
from rich.table import Table

from processing.config.reducers.ReducerConfig import ReducerConfig


def print_reducers(reducers: List[ReducerConfig]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Name")
    table.add_column("Reducer")
    table.add_column("Dimensions")
    table.add_column("Bands")
    table.add_column("Integrations")
    table.add_column("Ranges")

    for reducer in reducers:
        table.add_row(
            reducer.name,
            ReducerConfig.algorithms[reducer.name].__name__,
            str(reducer.dimensions),
            str(", ".join([b.name for b in reducer.bands])),
            str(", ".join([i.name for i in reducer.integrations])),
            str(
                "*"
                if len(reducer.ranges) == 0
                else ", ".join([r.name for r in reducer.ranges])
            ),
        )

    console.print(table)
