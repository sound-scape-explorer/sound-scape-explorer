from typing import Dict, List

from processing.new.TrajectoryConfigNew import TrajectoryConfigNew


PackedTrajectories = Dict[str, Dict[str, List[TrajectoryConfigNew]]]


# TODO: refactor me
def pack_trajectories(trajectories: List[TrajectoryConfigNew]) -> PackedTrajectories:
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
