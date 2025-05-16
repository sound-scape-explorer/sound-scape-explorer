from rich.console import Console
from rich.table import Table

from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.lib.time import convert_timestamp_to_date_string, format_milliseconds


def print_trajectories(trajectories: list[TrajectoryConfig]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("trajectory")
    table.add_column("start")
    table.add_column("end")
    table.add_column("tag name")
    table.add_column("tag value")
    table.add_column("smoothing window")

    for trajectory in trajectories:
        table.add_row(
            trajectory.name,
            convert_timestamp_to_date_string(trajectory.start),
            convert_timestamp_to_date_string(trajectory.end),
            trajectory.tag_name,
            trajectory.tag_value,
            format_milliseconds(trajectory.smoothing_window),
        )

    console.print(table)
