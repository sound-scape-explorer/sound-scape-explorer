import numpy
from h5py import Dataset
from pandas import pandas

from processing.utils.filter_features_by_tag_and_time import (
    filter_features_by_tag_and_time,
)


# TODO: refactor me
class ContinuousTimeTrajectory:
    def __init__(self) -> None:
        self._embeddings = None
        self._timestamps = None
        self._timestamp_start = None
        self._timestamp_end = None
        self._all_tag_names = None
        self._all_tag_values = None
        self._step = None
        self.relative_timestamps = None
        self.timestamps = None

    def _validate_load(self):
        if (
            self._embeddings is None
            or self._timestamps is None
            or self._timestamp_start is None
            or self._timestamp_end is None
            or self._all_tag_names is None
            or self._all_tag_values is None
            or self._step is None
        ):
            raise RuntimeError("Unable to find data for trajectory. Please load first.")

        return (
            self._embeddings,
            self._timestamps,
            self._timestamp_start,
            self._timestamp_end,
            self._all_tag_names,
            self._all_tag_values,
            self._step,
        )

    def _set_values(self, values: list[list[float]]) -> list[list[float]]:
        self.values = values
        return self.values

    def set_timestamps(self, timestamps: list[int]) -> list[int]:
        self.timestamps = timestamps
        return self.timestamps

    def set_relative_timestamps(
        self,
        relative_timestamps: list[int],
    ) -> list[int]:
        self.relative_timestamps = relative_timestamps
        return self.relative_timestamps

    def load(
        self,
        embeddings: Dataset,
        timestamps: list[int],
        timestamp_start: int,
        timestamp_end: int,
        all_tag_names: list[str],
        all_tag_values: list[list[str]],
        step: int,
    ):
        self._embeddings = embeddings
        self._timestamps = timestamps
        self._timestamp_start = timestamp_start
        self._timestamp_end = timestamp_end
        self._all_tag_names = all_tag_names
        self._all_tag_values = all_tag_values
        self._step = step

    def calculate(
        self,
        trajectory_tag_name: str,
        trajectory_tag_value: str,
    ) -> list[list[float]]:
        (
            features,
            timestamps,
            timestamp_start,
            timestamp_end,
            all_tag_names,
            all_tag_values,
            rolling_step,
        ) = self._validate_load()

        step = 1

        filtered_features, filtered_timestamps = filter_features_by_tag_and_time(
            features=features,
            timestamps=timestamps,
            timestamp_start=timestamp_start,
            timestamp_end=timestamp_end,
            all_tag_names=all_tag_names,
            all_tag_values=all_tag_values,
            trajectory_tag_name=trajectory_tag_name,
            trajectory_tag_value=trajectory_tag_value,
        )

        self.set_timestamps(filtered_timestamps)

        dimensions = len(filtered_features[0])

        df_features = pandas.DataFrame(filtered_features)
        df_features.columns = [d for d in range(dimensions)]

        df_timestamps = pandas.DataFrame({"timestamps": filtered_timestamps})

        df = pandas.concat((df_features, df_timestamps), axis=1)

        df["relative_timestamps"] = df["timestamps"] - min(df["timestamps"])
        df["relative_timestamps"] = df["relative_timestamps"].apply(
            lambda ms: (ms / 1000) / rolling_step
        )

        rolling_count = len(df[df["relative_timestamps"] <= step])
        self.set_relative_timestamps(df["relative_timestamps"].tolist())

        # Calculating coordinates
        coordinates = numpy.empty([dimensions, len(df)])

        for d in range(dimensions):
            coordinates[d, :] = (
                df[d]
                .rolling(rolling_count, min_periods=1)
                .apply(lambda x: numpy.nanmean(x))
            )

        self._set_values(coordinates.T.tolist())
        return self.values
