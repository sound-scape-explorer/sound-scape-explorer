from rich.console import Console
from rich.table import Table

from processing.config.MetricConfig import MetricConfig


def print_metrics(metrics: list[MetricConfig]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Index")
    table.add_column("Digester")
    table.add_column("Is pairing")

    for metric in metrics:
        table.add_row(
            str(metric.index),
            metric.impl.name,
            "Yes" if metric.is_pairwise else "No",
        )

    console.print(table)
