from typing import List

import numpy
from h5py import Dataset

from processing.common.Timer import Timer
from processing.constants import TIME_DELTA_MS
from processing.utils.print_new_line import print_new_line


class FeaturesGrouper:
    __features: List[Dataset]
    __timestamps: Dataset
    __timer: Timer

    def set_features(
        self,
        features: List[Dataset],
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

        print(
            f'FilesFeaturesGrouper loaded with integration of'
            f' {integration} seconds.'
        )

    def __progress(self) -> None:
        self.__timer.print_timeleft()

    def group(
        self,
        integration: int,
    ):
        self.__start(integration)

        features = []
        timestamps = []

        for file_index, file_features in enumerate(self.__features):
            file_timestamp = self.__timestamps[file_index]
            groups_count = len(file_features) // integration

            grouped_file_features = []
            grouped_file_timestamps = []

            for g in range(groups_count):
                start = integration * g
                end = integration * (g + 1)
                features_to_group = file_features[start:end]

                grouped_file_features.append(
                    numpy.mean(features_to_group, axis=0)
                )

                grouped_file_timestamps.append(
                    file_timestamp + integration * g * TIME_DELTA_MS
                )

            features.append(grouped_file_features)
            timestamps.append(grouped_file_timestamps)
            self.__progress()

        return features, timestamps
