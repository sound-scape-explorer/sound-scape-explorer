from typing import List, Tuple

from processing.config.files.FileConfig import FileConfig


class SiteConfig:
    index: int
    name: str
    files: List[FileConfig]

    def __init__(
        self,
        index: int,
        name: str,
        files: List[FileConfig],
    ) -> None:
        self.index = index
        self.name = name
        self.files = files

    @staticmethod
    def flatten(sites: List["SiteConfig"]) -> Tuple[List[str], List[List[int]]]:
        names = [s.name for s in sites]
        file_indexes = [[f.index for f in s.files] for s in sites]

        return names, file_indexes

    @staticmethod
    def reconstruct(
        names: List[str],
        file_indexes: List[List[int]],
        files: List[FileConfig],
    ) -> List["SiteConfig"]:
        sites: List[SiteConfig] = []

        for index, name in enumerate(names):
            files_by_site: List[FileConfig] = []

            for file in files:
                if file.index in file_indexes[index]:
                    files_by_site.append(file)

            site: SiteConfig = SiteConfig(
                index=index,
                name=name,
                files=files_by_site,
            )

            sites.append(site)

        return sites
