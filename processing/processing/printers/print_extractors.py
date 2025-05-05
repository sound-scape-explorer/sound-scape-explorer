from rich.console import Console
from rich.table import Table

from processing.config.ExtractorConfig import ExtractorConfig


def print_extractors(extractors: list[ExtractorConfig]):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("index")
    table.add_column("extractor")
    table.add_column("window (ms)")
    table.add_column("hop (ms)")

    for extractor in extractors:
        table.add_row(
            str(extractor.index),
            extractor.impl.name,
            str(extractor.window),
            str(extractor.hop),
        )

    console.print(table)
