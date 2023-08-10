from rich.console import Console
from rich.table import Table

from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.storage.Storage import Storage


def print_extractors(storage: Storage):
    extractors = ExtractorStorage.read_from_storage(storage)

    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Name")
    table.add_column("Extractor")
    table.add_column("Offset")
    table.add_column("Step")
    table.add_column("Persist")

    for extractor in extractors:
        table.add_row(
            extractor.name,
            ExtractorConfig.extractors[extractor.name].__name__,
            str(extractor.offset),
            str(extractor.step),
            str(extractor.persist),
        )

    console.print(table)
