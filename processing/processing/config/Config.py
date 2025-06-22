import json

from rich.progress import track

from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.FileConfig import FileConfig
from processing.config.RangeConfig import RangeConfig
from processing.config.SettingsConfig import SettingsConfig
from processing.dtos import JsonDto
from processing.enums import ComputationStrategy


class Config:
    version: str
    settings: SettingsConfig
    extractions: list[ExtractionConfig]
    ranges: list[RangeConfig]
    files: list[FileConfig]

    def __init__(self, path: str):
        self.path = path

        with open(path) as f:
            data = json.load(f)
            self.json = JsonDto(**data)

        self.version = self.json.version
        self.settings = SettingsConfig(self.json.settings, self.path)

        self.extractions = []
        for extraction_dto in track(
            self.json.extractions,
            description="Loading extractions...",
        ):
            self.extractions.append(ExtractionConfig.from_dto(extraction_dto))

        self.ranges = []
        for range_dto in track(self.json.ranges, description="Loading ranges..."):
            self.ranges.append(RangeConfig.from_dto(range_dto))

        self.files = []
        for file_dto in track(self.json.files, description="Loading files..."):
            self.files.append(FileConfig.from_dto(file_dto, self.settings))

    def has_autoclusters(self):
        has_autoclusters = False

        for extraction in self.extractions:
            if len(extraction.autoclusters) > 0:
                has_autoclusters = True
                break

        return has_autoclusters

    def has_metrics(self):
        has_metrics = False

        for extraction in self.extractions:
            if len(extraction.metrics) > 0:
                has_metrics = True
                break

        return has_metrics

    def has_trajectories(self):
        has_trajectories = False

        for extraction in self.extractions:
            if len(extraction.trajectories) > 0:
                has_trajectories = True
                break

        return has_trajectories

    def get_computation_iterations(self):
        if self.settings.computation_strategy is ComputationStrategy.UMAP:
            return self.settings.computation_iterations

        return 1
