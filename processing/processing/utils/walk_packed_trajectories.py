from processing.utils.pack_trajectories import PackedTrajectories


def walk_packed_trajectories(packed_trajectories: PackedTrajectories):
    for tag_name in packed_trajectories.keys():
        for tag_value in packed_trajectories[tag_name].keys():
            yield (
                tag_name,
                tag_value,
                packed_trajectories[tag_name][tag_value],
            )
