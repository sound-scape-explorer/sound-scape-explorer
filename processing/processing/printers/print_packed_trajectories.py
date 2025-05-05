from rich.console import Console
from rich.table import Table

from processing.utils.pack_trajectories import PackedTrajectories
from processing.utils.walk_packed_trajectories import walk_packed_trajectories


def print_packed_trajectories(packed_trajectories: PackedTrajectories):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Pack number")
    table.add_column("Label property")
    table.add_column("Label value")
    table.add_column("Trajectories count")

    index = 1

    for tag_name, tag_value, pack in walk_packed_trajectories(packed_trajectories):
        table.add_row(
            str(index),
            str(tag_name),
            str(tag_value),
            str(len(packed_trajectories[tag_name][tag_value])),
        )

        index += 1

    console.print(table)
