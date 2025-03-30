from rich.console import Console
from rich.table import Table

from processing.context import Context


def print_reducers(context: Context):
    reducers = context.config.reducers

    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Index")
    table.add_column("Reducer")
    table.add_column("Dimensions")
    table.add_column("Bands")
    table.add_column("Integrations")
    table.add_column("Extractors")

    for reducer in reducers:
        table.add_row(
            str(reducer.index),
            reducer.impl.name,
            str(reducer.dimensions),
            ", ".join([b.name for b in reducer.bands]),
            ", ".join([i.name for i in reducer.integrations]),
            ", ".join([i.name for i in reducer.extractors]),
        )

    console.print(table)
