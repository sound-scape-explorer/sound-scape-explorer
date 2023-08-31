from rich.console import Console
from rich.table import Table

from processing.common.YamlEnv import YamlEnv


def print_yaml_env(env: YamlEnv):
    console = Console()
    table = Table(show_header=True, header_style="bold magenta")

    table.add_column("File")
    table.add_column("Path")

    table.add_row("config", env.config)
    table.add_row("storage", env.storage)

    console.print(table)
