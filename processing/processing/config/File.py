from typing import Dict, List


class File:
    timestamp: int
    site: str
    tag: str
    meta: List[str]

    def __init__(
        self,
        timestamp: int,
        site: str,
        tag: str,
        meta: List[str]
    ) -> None:
        self.timestamp = timestamp
        self.site = site
        self.tag = tag
        self.meta = meta


FileName = str
Files = Dict[FileName, File]
