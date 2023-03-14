from typing import Dict, List


class ConfigFile:
    file: str
    timestamp: int
    site: str
    meta: List[str]

    def __init__(
        self,
        file: str,
        timestamp: int,
        site: str,
        meta: List[str]
    ) -> None:
        self.file = file
        self.timestamp = timestamp
        self.site = site
        self.meta = meta


File = str
ConfigFiles = Dict[File, ConfigFile]
