from typing import Dict, List


class Umap:
    integration: int
    bands: List[str]
    ranges: List[str]
    sites: List[str]

    def __init__(
        self,
        integration: int,
        bands: List[str],
        ranges: List[str],
        sites: List[str],
    ) -> None:
        self.integration = integration
        self.bands = bands
        self.ranges = ranges
        self.sites = sites


UmapName = str
Umaps = Dict[UmapName, Umap]
