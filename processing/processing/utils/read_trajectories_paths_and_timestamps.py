from typing import List

import pandas
from torch.utils.data import Dataset

from processing.common.ContinuousTimeTrajectory import ContinuousTimeTrajectory
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig


def read_trajectories_paths_and_timestamps(
    pack: List[TrajectoryConfig],
    features: Dataset,
    timestamps: Dataset,
    labels_properties: List[str],
    labels_values: Dataset,
    label_property: str,
    label_value: str,
):
    paths = []
    relative_timestamps = []

    for trajectory in pack:
        ctt = ContinuousTimeTrajectory()
        ctt.load(
            features=features,
            timestamps=timestamps,
            timestamp_start=trajectory.start,
            timestamp_end=trajectory.end,
            labels_properties=labels_properties,
            labels_values=labels_values,
            step=trajectory.step,
        )

        ctt.calculate(
            trajectory_label_property=label_property,
            trajectory_label_value=label_value,
        )

        path = pandas.DataFrame(ctt.values)
        paths.append(path)

        rt = pandas.DataFrame(ctt.relative_timestamps)
        relative_timestamps.append(rt)

    return paths, relative_timestamps
