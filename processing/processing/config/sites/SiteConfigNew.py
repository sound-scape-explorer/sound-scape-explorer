from dataclasses import dataclass
from typing import List

from processing.new.FileConfigNew import FileConfigNew


@dataclass
class SiteConfigNew:
    index: int
    name: str
    files: List[FileConfigNew]

    def __init__(
        self,
        index: int,
        name: str,
        files: List[FileConfigNew],
    ) -> None:
        self.index = index
        self.name = name
        self.files = files
