from typing import List, Tuple

from processing.config.ConfigFile import ConfigFile


class ConfigSite:
    index: int
    name: str
    files: List[ConfigFile]

    def __init__(
        self,
        index: int,
        name: str,
        files: List[ConfigFile],
    ) -> None:
        self.index = index
        self.name = name
        self.files = files

    @staticmethod
    def flatten(sites: List["ConfigSite"]) -> Tuple[List[str], List[List[int]]]:
        names = [s.name for s in sites]
        file_indexes = [[f.index for f in s.files] for s in sites]

        return names, file_indexes

    @staticmethod
    def reconstruct(
        names: List[str],
        file_indexes: List[List[int]],
        files: List[ConfigFile],
    ) -> List["ConfigSite"]:
        sites: List[ConfigSite] = []

        for index, name in enumerate(names):
            files_by_site: List[ConfigFile] = []

            for file in files:
                if file.index in file_indexes[index]:
                    files_by_site.append(file)

            site: ConfigSite = ConfigSite(
                index=index,
                name=name,
                files=files_by_site,
            )

            sites.append(site)

        return sites
