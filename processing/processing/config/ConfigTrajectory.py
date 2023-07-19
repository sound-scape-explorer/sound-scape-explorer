from typing import List


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
