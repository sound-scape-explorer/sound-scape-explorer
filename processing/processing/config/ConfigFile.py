from typing import List


class ConfigFile:
    index: int
    name: str
    timestamp: int
    site: str
    meta: List[str]

    def __init__(
        self,
        index: int,
        name: str,
        timestamp: int,
        site: str,
        meta: List[str],
    ) -> None:
        self.index = index
        self.name = name
        self.timestamp = timestamp
        self.site = site
        self.meta = meta

    @staticmethod
    def flatten(files: List["ConfigFile"]):
        names = [f.name for f in files]
        timestamps = [f.timestamp for f in files]
        sites = [f.site for f in files]
        metas = [f.meta for f in files]

        return names, timestamps, sites, metas

    @staticmethod
    def reconstruct(
        names: List[str],
        timestamps: List[int],
        sites: List[str],
        metas: List[List[str]],
    ) -> List["ConfigFile"]:
        files = []

        for index, name in enumerate(names):
            file_ = ConfigFile(
                index=index,
                name=name,
                timestamp=timestamps[index],
                site=sites[index],
                meta=metas[index],
            )

            files.append(file_)

        return files
