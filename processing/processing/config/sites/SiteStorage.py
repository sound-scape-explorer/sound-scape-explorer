from typing import List

from processing.config.files.FileConfig import FileConfig
from processing.config.files.FileStorage import FileStorage
from processing.config.settings.SettingsConfig import SettingsConfig
from processing.config.sites.SiteConfig import SiteConfig
from processing.constants import INT_NONE
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class SiteStorage:
    path_names = StoragePath.sites_names.value
    path_file_indexes = StoragePath.sites_file_indexes.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(SiteStorage.path_names)
        storage.delete(SiteStorage.path_file_indexes)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(
            SiteStorage.path_names
        ) and storage.exists_dataset(SiteStorage.path_file_indexes)

    @staticmethod
    def read_from_storage(
        storage: Storage,
        settings: SettingsConfig,
    ) -> List[SiteConfig]:
        names_dataset = storage.read(SiteStorage.path_names)
        names: List[str] = storage.convert_dataset_to_string_list(names_dataset)

        file_indexes_rectangular = storage.read(SiteStorage.path_file_indexes)[:]

        file_indexes: List[List[int]] = storage.trim_rectangular(
            file_indexes_rectangular,
            INT_NONE,
        )

        files = FileStorage.read_from_storage(storage, settings)

        sites = SiteConfig.reconstruct(
            names=names,
            file_indexes=file_indexes,
            files=files,
        )

        return sites

    @staticmethod
    def write_to_storage(sites: List[SiteConfig], storage: Storage) -> None:
        names, file_indexes = SiteConfig.flatten(sites)

        storage.write(
            path=SiteStorage.path_names,
            data=names,
        )

        file_indexes_rectangular = storage.make_rectangular(file_indexes, INT_NONE)

        storage.write(
            path=SiteStorage.path_file_indexes,
            data=file_indexes_rectangular,
        )

    @staticmethod
    def parse_from_config(files: List[FileConfig]) -> List[SiteConfig]:
        # Listing unique site names
        # Making this by hand because using `set()` has inconsistent order
        site_names = []
        for file in files:
            if file.site in site_names:
                continue

            site_names.append(file.site)

        sites = []

        for site_index, site_name in enumerate(site_names):
            picked_files = [file for file in files if file.site == site_name]

            site = SiteConfig(
                index=site_index,
                name=site_name,
                files=picked_files,
            )

            sites.append(site)

        return sites
