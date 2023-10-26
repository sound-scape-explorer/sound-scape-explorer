from typing import List, Tuple

from processing.utils.get_file_full_path import get_file_full_path


class FileConfig:
    index: int
    name: str
    timestamp: int  # UNIX timestamp in milliseconds
    site: str
    labels: List[str]
    duration: int  # milliseconds

    def __init__(
        self,
        index: int,
        name: str,
        timestamp: int,
        site: str,
        labels: List[str],
        duration: int,
        audio_path: str,
    ) -> None:
        self.index = index
        self.name = name
        self.timestamp = timestamp
        self.site = site
        self.labels = labels
        self.duration = duration
        self.audio_path = audio_path
        self.path = get_file_full_path(name, audio_path)

    @staticmethod
    def flatten(
        files: List["FileConfig"],
    ) -> Tuple[List[str], List[int], List[str], List[List[str]], List[int]]:
        names = [f.name for f in files]
        timestamps = [f.timestamp for f in files]
        sites = [f.site for f in files]
        labels = [f.labels for f in files]
        durations = [f.duration for f in files]

        return names, timestamps, sites, labels, durations

    @staticmethod
    def reconstruct(
        names: List[str],
        timestamps: List[int],
        sites: List[str],
        labels: List[List[str]],
        durations: List[int],
        audio_path: str,
    ) -> List["FileConfig"]:
        files = []

        for index, name in enumerate(names):
            file_ = FileConfig(
                index=index,
                name=name,
                timestamp=timestamps[index],
                site=sites[index],
                labels=labels[index],
                duration=durations[index],
                audio_path=audio_path,
            )

            files.append(file_)

        return files

    @property
    def seconds(self) -> int:
        return self.duration // 1000

    @property
    def milliseconds(self) -> int:
        return self.duration

    @property
    def start(self) -> int:
        return self.timestamp

    @property
    def end(self) -> int:
        return self.timestamp + self.duration

    def get_interval_count(self, interval_step: int) -> int:
        return (self.end - self.start) // interval_step
