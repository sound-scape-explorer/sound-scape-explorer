import pandas
from h5py import Dataset

from processing.common.ContinuousTimeTrajectory import ContinuousTimeTrajectory
from processing.config.TrajectoryConfig import TrajectoryConfig


def read_trajectory_path_and_relative_timestamps(
    trajectory: TrajectoryConfig,
    features: Dataset,
    timestamps: list[int],
    all_tag_names: list[str],
    all_tag_values: list[list[str]],
    tag_name: str,
    tag_value: str,
):
    ctt = ContinuousTimeTrajectory()
    ctt.load(
        embeddings=features,
        timestamps=timestamps,
        timestamp_start=trajectory.start,
        timestamp_end=trajectory.end,
        all_tag_names=all_tag_names,
        all_tag_values=all_tag_values,
        step=trajectory.step,
    )

    ctt.calculate(
        trajectory_tag_name=tag_name,
        trajectory_tag_value=tag_value,
    )

    # TODO: Add typings
    path = pandas.DataFrame(ctt.values)
    relative_timestamps = pandas.DataFrame(ctt.relative_timestamps)

    return path, relative_timestamps
