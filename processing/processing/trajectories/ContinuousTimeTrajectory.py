from typing import List, Union

import numpy
from h5py import Dataset
from pandas import DataFrame, pandas


class ContinuousTimeTrajectory:
    __features: Union[None, Dataset]
    __timestamps: Union[None, Dataset]  # List[milliseconds]
    __timestamp_start: Union[None, int]  # milliseconds
    __timestamp_end: Union[None, int]  # milliseconds
    __rolling_step: Union[None, int]  # milliseconds
    segments: List[int]
    values: DataFrame

    def __init__(self) -> None:
        self.__features = None
        self.__timestamps = None
        self.__timestamp_start = None
        self.__timestamp_end = None

    def _validate_load(self):
        if (
            self.__features is None
            or self.__timestamps is None
            or self.__timestamp_start is None
            or self.__timestamp_end is None
            or self.__rolling_step is None
        ):
            raise RuntimeError("Unable to find data for trajectory. Please load first.")

        return (
            self.__features,
            self.__timestamps,
            self.__timestamp_start,
            self.__timestamp_end,
            self.__rolling_step,
        )

    def _set(self, values: DataFrame) -> DataFrame:
        self.values = values
        return self.values

    def load(
        self,
        features: Dataset,
        timestamps: Dataset,
        timestamp_start: int,
        timestamp_end: int,
        rolling_step: int = 1000,  # milliseconds
    ):
        self.__features = features
        self.__timestamps = timestamps
        self.__timestamp_start = timestamp_start
        self.__timestamp_end = timestamp_end
        self.__rolling_step = rolling_step

    def calculate(self) -> DataFrame:
        (
            features,
            timestamps,
            timestamp_start,
            timestamp_end,
            rolling_step,
        ) = self._validate_load()

        # Filtering by timestamps
        filtered_features = []
        filtered_timestamps = []

        for index, timestamp in enumerate(timestamps):
            if timestamp[0] <= timestamp_start or timestamp[0] >= timestamp_end:
                continue

            filtered_features.append(features[index])
            filtered_timestamps.append(timestamp[0])

        # Calculating coordinates
        dimensions = len(filtered_features[0])
        coordinates = numpy.empty([dimensions, dimensions])

        filtered_features_dataframe = pandas.DataFrame(filtered_features)
        filtered_features_dataframe.columns = [d for d in range(dimensions)]
        filtered_features_dataframe = filtered_features_dataframe.T

        for d in range(dimensions):
            coordinates[d, :] = (
                filtered_features_dataframe[d]
                .rolling(rolling_step, min_periods=1)
                .apply(lambda x: numpy.nanmean(x))
            )

        coordinates_dataframe = pandas.DataFrame(coordinates)

        self._set(coordinates_dataframe.T)

        return self.values
