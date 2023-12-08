from typing import Dict, List

from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig

PackedTrajectories = Dict[str, Dict[str, List[TrajectoryConfig]]]


def pack_trajectories(
    trajectories: List[TrajectoryConfig],
) -> PackedTrajectories:
    packed_trajectories: PackedTrajectories = {}

    for trajectory in trajectories:
        label_property = trajectory.label_property
        label_value = trajectory.label_value

        if label_property not in packed_trajectories:
            packed_trajectories[label_property] = {}

        if label_value not in packed_trajectories[label_property]:
            packed_trajectories[label_property][label_value] = []

        packed_trajectories[label_property][label_value].append(trajectory)

    return packed_trajectories
