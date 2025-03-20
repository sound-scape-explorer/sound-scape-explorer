from typing import List

from rich.console import Console
from rich.table import Table

from processing.new.ReducerConfigNew import ReducerConfigNew


def print_reducers(reducers: List[ReducerConfigNew]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Index")
    table.add_column("Reducer")
    table.add_column("Dimensions")
    table.add_column("Bands")
    table.add_column("Integrations")

    for reducer in reducers:
        table.add_row(
            str(reducer.index),
            reducer.impl.name,
            str(reducer.dimensions),
            "*"
            if len(reducer.bands) == 0
            else str(", ".join([b.name for b in reducer.bands])),
            "*"
            if len(reducer.integrations) == 0
            else str(", ".join([i.name for i in reducer.integrations])),
        )

    console.print(table)
