from typing import List, Tuple

import numpy
from h5py import Dataset

from processing.classes.NewStorage import (
    NewStorage,
)
from processing.constants import TIME_DELTA_MS

ChunkFeatures = List[float]
Features = List[ChunkFeatures]
Groups = Tuple[Features, List[int]]


class NewFeatureGrouper:
    __storage: NewStorage = NewStorage()
    __bands: Dataset = __storage.get_bands()
    __ranges: Dataset = __storage.get_ranges()
    __ranges_timestamps: Dataset = __storage.get_ranges_timestamps()
    __files: Dataset = __storage.get_files()
    __files_timestamps: Dataset = __storage.get_files_timestamps()
    __integrations: Dataset = __storage.get_integrations()

    def __init__(self):
        self.__run()

    @staticmethod
    def __get_duration(features: Dataset) -> float:
        return TIME_DELTA_MS * len(features)

    def __get_range_timestamps(self, range_index: int) -> Tuple[int, int]:
        range_timestamps: Tuple[int, int] = self.__ranges_timestamps[
            range_index]
        start, end = range_timestamps

        return start, end

    def __get_file_timestamp(self, file_index: int) -> int:
        return self.__files_timestamps[file_index]

    def __get_involved_ranges(
        self,
        file_index: int,
        duration: float,
    ) -> List[str]:
        ranges = []
        timestamp = self.__get_file_timestamp(file_index)

        for index, range_ in enumerate(self.__ranges):
            start, end = self.__get_range_timestamps(index)

            if timestamp >= start and timestamp + duration <= end:
                ranges.append(range_)

        return ranges

    def __get_involved_chunks(
        self,
        band_name: str,
        range_index: int,
        file_index: int,
    ) -> Tuple[List[Dataset], List[int]]:
        file_features = self.__storage.get_file_features(band_name, file_index)
        file_timestamp = self.__get_file_timestamp(file_index)
        start, end = self.__get_range_timestamps(range_index)

        chunk_features = []
        chunk_timestamps = []

        for i in range(len(file_features)):
            delta = TIME_DELTA_MS * i
            chunk_timestamp = file_timestamp + delta

            if chunk_timestamp < start or chunk_timestamp > end:
                continue

            chunk_timestamps.append(chunk_timestamp)
            chunk_features.append(file_features[i])

        return chunk_features, chunk_timestamps

    def __group_chunks(
        self,
        chunks: Tuple[List[Dataset], List[int]],
        integration: int,
        range_index: int,
    ) -> Groups:
        integration = integration * 1000  # milliseconds
        chunks_features, chunks_timestamps = chunks
        range_start, _ = self.__get_range_timestamps(range_index)

        group_bins = []

        for chunk_timestamp in chunks_timestamps:
            grouped_bin = (chunk_timestamp - range_start) // integration
            group_bins.append(grouped_bin)

        selected_chunks_indexes = numpy.unique(group_bins, return_index=True)[
            1]

        groups_timestamps = []
        groups_starts = []
        groups_ends = []

        for group_index, chunk_index in enumerate(selected_chunks_indexes):
            group_timestamp = range_start + \
                              group_bins[chunk_index] * integration

            if group_index == len(selected_chunks_indexes) - 1:
                group_end = None
            else:
                group_end = selected_chunks_indexes[group_index + 1]

            groups_timestamps.append(group_timestamp)
            groups_starts.append(chunk_index)
            groups_ends.append(group_end)

        groups_features = []

        for group_index, _ in enumerate(groups_timestamps):
            group_start = groups_starts[group_index]
            group_end = groups_ends[group_index]

            group_features: List[float] = numpy.mean(  # type:ignore
                chunks_features[group_start:group_end],
                axis=0,
            )

            groups_features.append(group_features)

        return groups_features, groups_timestamps

    def __store_groups(
        self,
        groups: Groups,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        groups_features, groups_timestamps = groups

        self.__storage.create_groups(
            features=groups_features,
            timestamps=groups_timestamps,
            band=band,
            integration=integration,
            file_index=file_index,
        )

    def __run(self) -> None:
        for band in self.__bands:
            for file_index, _ in enumerate(self.__files):
                file_features = self.__storage.get_file_features(
                    band,
                    file_index
                )

                file_duration = self.__get_duration(file_features)

                ranges = self.__get_involved_ranges(file_index, file_duration)

                if len(ranges) == 0:
                    continue

                for range_index, _ in enumerate(ranges):
                    chunks = self.__get_involved_chunks(
                        band,
                        range_index,
                        file_index
                    )

                    for integration in self.__integrations:
                        groups = self.__group_chunks(
                            chunks,
                            integration,
                            range_index,
                        )

                        self.__store_groups(
                            groups,
                            band,
                            integration,
                            file_index
                        )
