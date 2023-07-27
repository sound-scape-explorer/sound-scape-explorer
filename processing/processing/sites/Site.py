from typing import List, Tuple

from processing.config.ConfigFile import ConfigFile


class Site:
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
    def flatten(sites: List["Site"]) -> Tuple[List[str], List[List[int]]]:
        names = [s.name for s in sites]
        file_indexes = [[f.index for f in s.files] for s in sites]

        return names, file_indexes
