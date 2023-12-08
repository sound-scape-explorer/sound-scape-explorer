from processing.utils.pack_trajectories import PackedTrajectories


def walk_packed_trajectories(packed_trajectories: PackedTrajectories):
    for label_property in packed_trajectories.keys():
        for label_value in packed_trajectories[label_property].keys():
            yield (
                label_property,
                label_value,
                packed_trajectories[label_property][label_value],
            )
