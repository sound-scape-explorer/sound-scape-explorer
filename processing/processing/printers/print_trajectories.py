from rich.console import Console
from rich.table import Table

from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.utils.convert_timestamp_to_date import convert_timestamp_to_date


def print_trajectories(trajectories: list[TrajectoryConfig]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("trajectory")
    table.add_column("start")
    table.add_column("end")
    table.add_column("tag name")
    table.add_column("tag value")
    table.add_column("step (s)")

    for trajectory in trajectories:
        table.add_row(
            trajectory.name,
            convert_timestamp_to_date(trajectory.start),
            convert_timestamp_to_date(trajectory.end),
            trajectory.tag_name,
            trajectory.tag_value,
            str(trajectory.step),
        )

    console.print(table)
