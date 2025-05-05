from processing.config.TrajectoryConfig import TrajectoryConfig


PackedTrajectories = dict[str, dict[str, list[TrajectoryConfig]]]


# TODO: refactor me
def pack_trajectories(
    trajectories: list[TrajectoryConfig],
) -> PackedTrajectories:
    packed_trajectories: PackedTrajectories = {}

    for trajectory in trajectories:
        tag_name = trajectory.tag_name
        tag_value = trajectory.tag_value

        if tag_name not in packed_trajectories:
            packed_trajectories[tag_name] = {}

        if tag_value not in packed_trajectories[tag_name]:
            packed_trajectories[tag_name][tag_value] = []

        packed_trajectories[tag_name][tag_value].append(trajectory)

    return packed_trajectories
