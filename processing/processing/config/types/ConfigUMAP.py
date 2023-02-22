from typing import List, TypedDict


class ConfigUMAP(TypedDict):
    integration: int
    bands: List[str]
    ranges: List[str]
    sites: List[str]
