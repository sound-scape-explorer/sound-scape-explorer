from typing import List, Tuple

import numpy
from h5py import Dataset
# noinspection PyProtectedMember
from h5py._hl.dataset import AsStrWrapper

from processing.constants import TIME_DELTA_MS
from processing.storage.Storage import Storage

ChunkFeatures = List[float]
Features = List[ChunkFeatures]
Groups = Tuple[Features, List[int]]


class FeaturesGrouper:
    __storage: Storage
    __ranges: AsStrWrapper
    __ranges_timestamps: Dataset
    __files_timestamps: Dataset
    __integration: int

    def __init__(
        self,
        storage: Storage,
        integration: int,
    ):
        self.__storage = storage
        self.__integration = integration

        self.__ranges = self.__storage.get_ranges()
        self.__ranges_timestamps = self.__storage.get_ranges_timestamps()
        self.__files_timestamps = self.__storage.get_files_timestamps()

    @staticmethod
    def __get_duration(features: Dataset) -> float:
        return TIME_DELTA_MS * len(features)

    def __get_range_timestamps(self, range_index: int) -> Tuple[int, int]:
        range_timestamps: Tuple[int, int] = \
            self.__ranges_timestamps[range_index]

        start, end = range_timestamps

        return start, end

    def __get_file_timestamp(self, file_index: int) -> int:
        return self.__files_timestamps[file_index]

    def __get_involved_ranges(
        self,
        file_index: int,
        band: str,
    ) -> List[str]:
        features = self.__storage.get_file_features(
            band_name=band,
            file_index=file_index,
        )

        timestamp = self.__get_file_timestamp(file_index)
        duration = self.__get_duration(features)
        ranges = []

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
        range_index: int,
    ) -> Groups:
        integration = self.__integration * 1000  # milliseconds
        chunks_features, chunks_timestamps = chunks
        range_start, _ = self.__get_range_timestamps(range_index)

        group_bins = []

        for chunk_timestamp in chunks_timestamps:
            grouped_bin = (chunk_timestamp - range_start) // integration
            group_bins.append(grouped_bin)

        chunks_slice_positions = numpy.unique(group_bins, return_index=True)[1]

        groups_timestamps = []
        groups_starts = []
        groups_ends = []

        for group_index, chunk_index in enumerate(chunks_slice_positions):
            group_timestamp = range_start + \
                              group_bins[chunk_index] * integration

            if group_index == len(chunks_slice_positions) - 1:
                group_end = None
            else:
                group_end = chunks_slice_positions[group_index + 1]

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

        # TODO: add groups_volumes, volume algorithm can be specified at
        #  runtime.
        return groups_features, groups_timestamps

    def get_group(
        self,
        band: str,
        file_index: int,
    ) -> Tuple[List[List[float]], List[int]]:
        ranges = self.__get_involved_ranges(file_index=file_index, band=band)

        if len(ranges) == 0:
            raise RuntimeError(
                f'Involved range(s) for file_index {file_index} could not be '
                f'found.'
            )

        for range_index, _ in enumerate(ranges):
            chunks = self.__get_involved_chunks(
                band_name=band,
                range_index=range_index,
                file_index=file_index,
            )

            group = self.__group_chunks(
                chunks=chunks,
                range_index=range_index,
            )

            return group
