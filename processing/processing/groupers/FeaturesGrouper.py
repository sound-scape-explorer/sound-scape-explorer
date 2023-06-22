import numpy
from h5py import Dataset

from processing.common.Timer import Timer
from processing.constants import TIME_DELTA_MS
from processing.utils.print_new_line import print_new_line


class FeaturesGrouper:
    __features: Dataset
    __timestamps: Dataset
    __timer: Timer

    def set_features(
        self,
        features: Dataset,
    ):
        self.__features = features
        return self

    def set_timestamps(
        self,
        timestamps: Dataset,
    ):
        self.__timestamps = timestamps
        return self

    def __start(
        self,
        integration: int,
    ) -> None:
        self.__timer = Timer(len(self.__features))

        print_new_line()

        print(f"FeaturesGrouper loaded with integration of" f" {integration} seconds.")

    def __progress(self) -> None:
        self.__timer.progress()

    def group(
        self,
        integration: int,
    ):
        self.__start(integration)

        grouped_features = []
        timestamps = []
        durations = []

        for file_index, file_features in enumerate(self.__features):
            file_timestamp = self.__timestamps[file_index]
            groups_count = len(file_features) // integration

            all_grouped_features = []
            all_grouped_timestamps = []
            all_grouped_durations = []

            for g in range(groups_count):
                start = integration * g
                end = integration * (g + 1)

                features_to_group = file_features[start:end]

                grouped_features = list(numpy.mean(features_to_group, axis=0))
                grouped_timestamp = file_timestamp + integration * g * TIME_DELTA_MS
                grouped_duration = end - start

                all_grouped_features.append(grouped_features)
                all_grouped_timestamps.append(grouped_timestamp)
                all_grouped_durations.append(grouped_duration)

            self.__progress()

        return grouped_features, timestamps, durations
