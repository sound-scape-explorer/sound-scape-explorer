from typing import List

from rich.console import Console
from rich.table import Table

from processing.config.autoclusters.AutoclusterConfig import AutoclusterConfig


def print_autoclusters(autoclusters: List[AutoclusterConfig]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Autocluster")
    table.add_column("Min cluster size")
    table.add_column("Min samples")
    table.add_column("Alpha")
    table.add_column("Epsilon")

    for autocluster in autoclusters:
        table.add_row(
            autocluster.name,
            str(autocluster.min_cluster_size),
            str(autocluster.min_samples),
            str(autocluster.alpha),
            str(autocluster.epsilon),
        )

    console.print(table)
