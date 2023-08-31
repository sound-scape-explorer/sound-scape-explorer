from typing import List

import numpy
from h5py import Dataset
from pandas import pandas


class ContinuousTimeTrajectory:
    def __init__(self) -> None:
        self.__features = None
        self.__timestamps = None
        self.__timestamp_start = None
        self.__timestamp_end = None
        self.__labels_properties = None
        self.__labels_values = None
        self.__step = None

    def _validate_load(self):
        if (
            self.__features is None
            or self.__timestamps is None
            or self.__timestamp_start is None
            or self.__timestamp_end is None
            or self.__labels_properties is None
            or self.__labels_values is None
            or self.__step is None
        ):
            raise RuntimeError("Unable to find data for trajectory. Please load first.")

        return (
            self.__features,
            self.__timestamps,
            self.__timestamp_start,
            self.__timestamp_end,
            self.__labels_properties,
            self.__labels_values,
            self.__step,
        )

    def _set_values(self, values: List[List[float]]) -> List[List[float]]:
        self.values = values
        return self.values

    def set_timestamps(self, timestamps: List[int]) -> List[int]:
        self.timestamps = timestamps
        return self.timestamps

    def set_relative_timestamps(
        self,
        relative_timestamps: List[float],
    ) -> List[int]:
        self.relative_timestamps = [int(rt) for rt in relative_timestamps]
        return self.relative_timestamps

    def load(
        self,
        features: Dataset,
        timestamps: Dataset,
        timestamp_start: int,
        timestamp_end: int,
        labels_properties: List[str],
        labels_values: Dataset,
        step: int,
    ):
        self.__features = features
        self.__timestamps = timestamps
        self.__timestamp_start = timestamp_start
        self.__timestamp_end = timestamp_end
        self.__labels_properties = labels_properties
        self.__labels_values = labels_values
        self.__step = step

    def calculate(
        self,
        trajectory_label_property: str,
        trajectory_label_value: str,
    ) -> List[List[float]]:
        (
            features,
            timestamps,
            timestamp_start,
            timestamp_end,
            labels_properties,
            labels_values,
            rolling_step,
        ) = self._validate_load()

        # Filtering by timestamps
        filtered_features = []
        filtered_timestamps: List[int] = []
        label_property_index = labels_properties.index(trajectory_label_property)

        for index, timestamp in enumerate(timestamps):
            label_values = labels_values[index]
            label_value = label_values[label_property_index].decode("utf-8")

            if (
                timestamp[0] <= timestamp_start
                or timestamp[0] >= timestamp_end
                or label_value != trajectory_label_value
            ):
                continue

            filtered_features.append(features[index])
            filtered_timestamps.append(timestamp[0])

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

        rolling_count = len(df[df["relative_timestamps"] <= rolling_step])

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
