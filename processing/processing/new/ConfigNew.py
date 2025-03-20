import json

from processing.dtos import JsonDto
from processing.new.AutoclusterConfigNew import AutoclusterConfigNew
from processing.new.BandConfigNew import BandConfigNew
from processing.new.DigesterConfigNew import DigesterConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.FileConfigNew import FileConfigNew
from processing.new.IndexConfigNew import IndexConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.RangeConfigNew import RangeConfigNew
from processing.new.ReducerConfigNew import ReducerConfigNew
from processing.new.SettingsConfigNew import SettingsConfigNew
from processing.new.TrajectoryConfigNew import TrajectoryConfigNew


class ConfigNew:
    version: str
    settings: SettingsConfigNew
    files: list[FileConfigNew]
    bands: list[BandConfigNew]
    integrations: list[IntegrationConfigNew]
    extractors: list[ExtractorConfigNew]
    indices: list[IndexConfigNew]
    ranges: list[RangeConfigNew]
    autoclusters: list[AutoclusterConfigNew]
    trajectories: list[TrajectoryConfigNew]
    digesters: list[DigesterConfigNew]
    reducers: list[ReducerConfigNew]

    def __init__(self, path: str):
        self.path = path

        with open(path) as f:
            data = json.load(f)
            self.json = JsonDto(**data)

        self.version = self.json.version
        self.settings = SettingsConfigNew(self.json.settings, self.path)
        self.files = [FileConfigNew.from_dto(f, self.settings) for f in self.json.files]
        self.bands = [BandConfigNew.from_dto(b) for b in self.json.bands]
        self.integrations = [
            IntegrationConfigNew.from_dto(i) for i in self.json.integrations
        ]
        self.extractors = [ExtractorConfigNew.from_dto(e) for e in self.json.extractors]
        self.indices = [IndexConfigNew.from_dto(i) for i in self.json.indices]
        self.ranges = [RangeConfigNew.from_dto(r) for r in self.json.ranges]
        self.autoclusters = [
            AutoclusterConfigNew.from_dto(ac) for ac in self.json.autoclusters
        ]
        self.trajectories = [
            TrajectoryConfigNew.from_dto(t) for t in self.json.trajectories
        ]
        self.digesters = [DigesterConfigNew.from_dto(d) for d in self.json.digesters]

        self.reducers = [
            ReducerConfigNew.from_dto(
                r,
                bands=self.bands,
                integrations=self.integrations,
                extractors=self.extractors,
            )
            for r in self.json.reducers
        ]
