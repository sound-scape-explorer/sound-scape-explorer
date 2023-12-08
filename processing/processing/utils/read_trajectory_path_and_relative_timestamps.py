from typing import List

import pandas
from torch.utils.data import Dataset

from processing.common.ContinuousTimeTrajectory import ContinuousTimeTrajectory
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig


def read_trajectory_path_and_relative_timestamps(
    trajectory: TrajectoryConfig,
    features: Dataset,
    timestamps: Dataset,
    labels_properties: List[str],
    labels_values: Dataset,
    label_property: str,
    label_value: str,
):
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
    relative_timestamps = pandas.DataFrame(ctt.relative_timestamps)

    return path, relative_timestamps
