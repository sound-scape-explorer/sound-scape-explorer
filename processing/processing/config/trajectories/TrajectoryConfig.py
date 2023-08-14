from typing import List

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.trajectories.ContinuousTimeTrajectory import ContinuousTimeTrajectory


class TrajectoryConfig:
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
    def flatten(trajectories: List["TrajectoryConfig"]):
        names = [t.name for t in trajectories]
        starts = [t.start for t in trajectories]
        ends = [t.end for t in trajectories]

        return names, starts, ends

    @staticmethod
    def reconstruct(
        names: List[str],
        starts: List[int],
        ends: List[int],
    ) -> List["TrajectoryConfig"]:
        trajectories = []

        for index, name in enumerate(names):
            start = starts[index]
            end = ends[index]

            trajectory = TrajectoryConfig(
                index=index,
                name=name,
                start=start,
                end=end,
            )

            trajectories.append(trajectory)

        return trajectories

    def create_instance(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
        reducer: ReducerConfig,
    ) -> ContinuousTimeTrajectory:
        self.band = band
        self.integration = integration
        self.reducer = reducer
        self.instance = ContinuousTimeTrajectory()
        return self.instance
