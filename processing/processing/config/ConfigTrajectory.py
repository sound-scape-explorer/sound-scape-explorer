from typing import List

from h5py import Dataset

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.config.ConfigReducer import ConfigReducer
from processing.trajectories.ContinuousTimeTrajectory import ContinuousTimeTrajectory


class ConfigTrajectory:
    index: int
    name: str
    start: int
    end: int
    band: ConfigBand
    integration: ConfigIntegration
    reducer: ConfigReducer
    instance: ContinuousTimeTrajectory

    def __init__(
        self,
        index: int,
        name: str,
        start: int,
        end: int,
    ) -> None:
        self.index = index
        self.name = name
        self.start = start
        self.end = end

    @staticmethod
    def flatten(trajectories: List["ConfigTrajectory"]):
        names = [t.name for t in trajectories]
        starts = [t.start for t in trajectories]
        ends = [t.end for t in trajectories]

        return names, starts, ends

    @staticmethod
    def reconstruct(
        names: List[str],
        starts: List[int],
        ends: List[int],
    ) -> List["ConfigTrajectory"]:
        trajectories = []

        for index, name in enumerate(names):
            start = starts[index]
            end = ends[index]

            trajectory = ConfigTrajectory(
                index=index,
                name=name,
                start=start,
                end=end,
            )

            trajectories.append(trajectory)

        return trajectories

    def create_instance(
        self,
        features: List[Dataset],
        timestamps: Dataset,
        band: ConfigBand,
        integration: ConfigIntegration,
        reducer: ConfigReducer,
    ) -> ContinuousTimeTrajectory:
        self.band = band
        self.integration = integration
        self.reducer = reducer

        self.instance = ContinuousTimeTrajectory(
            features=features,
            timestamps=timestamps,
            date_start=self.start,
            date_end=self.end,
            color_by="test",
        )

        return self.instance
