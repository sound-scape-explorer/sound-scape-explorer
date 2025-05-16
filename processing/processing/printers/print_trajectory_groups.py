from rich.console import Console
from rich.table import Table

from processing.services.TrajectoryService import TrajectoryGroups, TrajectoryService


def print_trajectory_groups(groups: TrajectoryGroups):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Group index")
    table.add_column("Tag name")
    table.add_column("Tag value")
    table.add_column("Trajectory count")

    index = 1

    for ti in TrajectoryService.iterate_groups(groups):
        table.add_row(
            str(index),
            str(ti.tag_name),
            str(ti.tag_value),
            str(len(ti.trajectories)),
        )

        index += 1

    console.print(table)
