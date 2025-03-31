from rich.console import Console
from rich.table import Table

from processing.context import Context


def print_extractors(context: Context):
    extractors = context.config.extractors

    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Name")
    table.add_column("Extractor")
    table.add_column("Offset (ms)")
    table.add_column("Step (ms)")
    table.add_column("Persist (raw step data)")

    for extractor in extractors:
        table.add_row(
            extractor.name,
            extractor.impl.name,
            str(extractor.offset),
            str(extractor.step),
            "[green]:heavy_check_mark:[/green]"
            if extractor.is_persist
            else "[red]:x:[/red]",
        )

    console.print(table)
