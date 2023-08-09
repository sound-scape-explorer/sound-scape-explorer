from processing.config.settings.SettingsConfig import SettingsConfig
from processing.config.sites.SiteStorage import SiteStorage
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def print_file_indexes_by_site(storage: Storage, settings: SettingsConfig):
    print_new_line()
    print("File indexes by site")

    sites = SiteStorage.read_from_storage(storage, settings)

    for site in sites:
        print(site.name, [f.index for f in site.files])
