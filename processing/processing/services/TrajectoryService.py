from collections import defaultdict
from typing import NamedTuple

from processing.config.TrajectoryConfig import TrajectoryConfig


_TagName = str
_TagValue = str
TrajectoryGroups = dict[_TagName, dict[_TagValue, list[TrajectoryConfig]]]


class TrajectoryIteration(NamedTuple):
    tag_name: str
    tag_value: str
    trajectories: list[TrajectoryConfig]


class TrajectoryService:
    @staticmethod
    def group_by_tags(trajectories: list[TrajectoryConfig]) -> TrajectoryGroups:
        groups = defaultdict(lambda: defaultdict(list))

        for trajectory in trajectories:
            groups[trajectory.tag_name][trajectory.tag_value].append(trajectory)

        return dict(groups)

    @staticmethod
    def iterate_groups(groups: TrajectoryGroups):
        for tag_name in groups.keys():
            for tag_value in groups[tag_name].keys():
                trajectories = groups[tag_name][tag_value]

                yield TrajectoryIteration(
                    tag_name=tag_name,
                    tag_value=tag_value,
                    trajectories=trajectories,
                )
