from rich.console import Console
from rich.table import Table

from processing.config.settings.SettingsRow import SettingsRow
from processing.context import Context
from processing.utils.convert_timestamp_to_date import convert_timestamp_to_date


def print_settings(context: Context):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Setting")
    table.add_column("Value")

    for k, v in vars(context.config.settings).items():
        if k == SettingsRow.timeline_origin.value:
            v = convert_timestamp_to_date(v)

        table.add_row(str(k), str(v))

    console.print(table)
