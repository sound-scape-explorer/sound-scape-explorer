from typing import List

from processing.common.ContinuousTimeTrajectory import ContinuousTimeTrajectory
from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.reducers.ReducerConfig import ReducerConfig


class TrajectoryConfig:
    step_by_name = {
        "hour": 60 * 60,
        "day": 60 * 60 * 24,
        "month": 60 * 60 * 24 * 30,
    }

    def __init__(
        self,
        index: int,
        name: str,
        start: int,
        end: int,
        label_property: str,
        label_value: str,
        step: int,  # seconds
    ) -> None:
        self.index = index
        self.name = name
        self.start = start
        self.end = end
        self.label_property = label_property
        self.label_value = label_value
        self.step = step

    @staticmethod
    def flatten(trajectories: List["TrajectoryConfig"]):
        names = [t.name for t in trajectories]
        starts = [t.start for t in trajectories]
        ends = [t.end for t in trajectories]
        label_properties = [t.label_property for t in trajectories]
        label_values = [t.label_value for t in trajectories]
        steps = [t.step for t in trajectories]

        return names, starts, ends, label_properties, label_values, steps

    @staticmethod
    def reconstruct(
        names: List[str],
        starts: List[int],
        ends: List[int],
        label_properties: List[str],
        label_values: List[str],
        steps: List[int],
    ) -> List["TrajectoryConfig"]:
        trajectories = []

        for index, name in enumerate(names):
            start = starts[index]
            end = ends[index]
            label_property = label_properties[index]
            label_value = label_values[index]
            step = steps[index]

            trajectory = TrajectoryConfig(
                index=index,
                name=name,
                start=start,
                end=end,
                label_property=label_property,
                label_value=label_value,
                step=step,
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
