from enum import Enum

import numpy as np
import pandas as pd
from h5py import Dataset

from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.interfaces import Interval, TrajectoryData


class _DataFrameKey(Enum):
    EMBEDDINGS = "embeddings"
    TIMESTAMPS = "timestamps"
    RELATIVE_TIMESTAMPS = "relative_timestamps"


class SingleTrajectory:
    def __init__(
        self,
        trajectory: TrajectoryConfig,
        embeddings: np.ndarray | Dataset,
        intervals: list[Interval],
    ):
        self.trajectory = trajectory
        self.embeddings = embeddings
        self.intervals = intervals

    def _filter(self):
        filtered: list[Interval] = []

        for i in self.intervals:
            # time filtering
            is_too_early = i.aggregations.start < self.trajectory.start
            is_too_late = i.aggregations.end > self.trajectory.end

            if is_too_early or is_too_late:
                continue

            # tag filtering
            tag_name = self.trajectory.tag_name
            if tag_name not in i.tags:
                continue

            tag_value = self.trajectory.tag_value
            if tag_value not in i.tags[tag_name]:
                continue

            filtered.append(i)

        return filtered

    def run(self):
        filtered_intervals = self._filter()

        assert len(filtered_intervals) > 0, "No intervals left after filtering."

        indices = [interval.i for interval in filtered_intervals]
        selected_embeddings = self.embeddings[indices]
        selected_timestamps = np.stack([i.aggregations.start for i in filtered_intervals])

        # building dataframe
        dimensions = selected_embeddings.shape[1]
        df_embeddings = pd.DataFrame(selected_embeddings)
        df_embeddings.columns = [d for d in range(dimensions)]

        key_t = _DataFrameKey.TIMESTAMPS.value
        key_rt = _DataFrameKey.RELATIVE_TIMESTAMPS.value

        df_timestamps = pd.DataFrame(
            {
                key_t: selected_timestamps,
            }
        )

        df = pd.concat((df_embeddings, df_timestamps), axis=1)

        min_timestamp = df[key_t].min()
        df[key_rt] = df[key_t] - min_timestamp

        # Determine window size based on time density
        window_size = len(df[df[key_rt] <= self.trajectory.smoothing_window])

        # logic check
        assert window_size >= 1, f"Window size must be at least 1. Got {window_size}."

        # Initialize result array
        coordinates = np.empty([dimensions, len(df)])

        # Apply rolling window average for each dimension
        for d in range(dimensions):
            coordinates[d, :] = (
                df[d].rolling(window_size, min_periods=1).apply(lambda x: np.nanmean(x))
            )

        path = coordinates.T

        return TrajectoryData(
            path=path,
            timestamps=selected_timestamps,
        )
