from typing import List

from rich.console import Console
from rich.table import Table

from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.utils.convert_timestamp_to_date import convert_timestamp_to_date


def print_trajectories(trajectories: List[TrajectoryConfig]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Trajectory")
    table.add_column("Start")
    table.add_column("End")
    table.add_column("Label property")
    table.add_column("Label value")
    table.add_column("Step")

    for trajectory in trajectories:
        table.add_row(
            trajectory.name,
            convert_timestamp_to_date(trajectory.start),
            convert_timestamp_to_date(trajectory.end),
            trajectory.label_property,
            trajectory.label_value,
            str(trajectory.step),
        )

    console.print(table)
