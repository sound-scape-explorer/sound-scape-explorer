from typing import List

from rich.console import Console
from rich.table import Table

from processing.config.labels.LabelConfig import LabelConfig


def print_labels(labels: List[LabelConfig]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Index")
    table.add_column("Property")
    table.add_column("Set")
    table.add_column("Values count")

    for label in labels:
        table.add_row(
            str(label.index),
            label.property,
            ", ".join([unique for unique in label.uniques]),
            str(len(label.values)),
        )

    console.print(table)
