from rich.console import Console
from rich.table import Table

from processing.config.settings.SettingsConfig import SettingsConfig
from processing.config.sites.SiteStorage import SiteStorage
from processing.storage.Storage import Storage


def print_file_indexes_by_site(storage: Storage, settings: SettingsConfig):
    console = Console()

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Site")
    table.add_column("File indexes")

    sites = SiteStorage.read_from_storage(storage, settings)

    for site in sites:
        table.add_row(
            site.name,
            str(", ".join([str(f.index) for f in site.files])),
        )

    console.print(table)
