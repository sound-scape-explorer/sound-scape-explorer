from typing import List

from h5py import Dataset

from processing.trajectories.ContinuousTimeTrajectory import ContinuousTimeTrajectory


class ConfigTrajectory:
    index: int
    name: str
    start: int
    end: int

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

    def create(
        self,
        features: List[Dataset],
        timestamps: Dataset,
    ) -> ContinuousTimeTrajectory:
        return ContinuousTimeTrajectory(
            features=features,
            timestamps=timestamps,
            date_start=self.start,
            date_end=self.end,
            color_by="test",
        )
