from collections import defaultdict
from typing import Optional

import numpy as np
from rich.progress import Progress

from processing.constants import STRING_DELIMITER
from processing.context import Context
from processing.interfaces import TimelineSlice, TimelineAggregate
from processing.lib.console import Console
from processing.lib.time import convert_timestamp_to_date_string
from processing.managers.ExtractionManager import ExtractedByExtractorIndex
from processing.repositories.ExtractionRepository import ExtractionData


_ExtractorIndex = int
_SlicesDict = dict[_ExtractorIndex, list[TimelineSlice]]


class Timeline:
    def __init__(self, context: Context):
        self.context = context
        self.slices: _SlicesDict = defaultdict(list)
        self._earliest_timestamp: Optional[int] = None
        self._latest_timestamp: Optional[int] = None

    @staticmethod
    def _slice(extracted: ExtractionData) -> list[TimelineSlice]:
        """Convert ExtractedData into a list of TimelineSliceData objects."""
        slices: list[TimelineSlice] = []

        for i, _ in enumerate(extracted.starts):
            s = TimelineSlice(
                extractor=extracted.extractor,
                file=extracted.file,
                embeddings=extracted.embeddings[i],
                astart=extracted.astarts[i],
                aend=extracted.aends[i],
                rstart=extracted.starts[i],
                rend=extracted.ends[i],
            )
            slices.append(s)
        return slices

    @staticmethod
    def _validate_chrono(all_extracted: list[ExtractionData]) -> None:
        """Validate that extracted data is in chronological order."""
        if len(all_extracted) <= 1:
            return

        for i in range(1, len(all_extracted)):
            previous = all_extracted[i - 1]
            current = all_extracted[i]

            previous_start = previous.file.timestamp
            current_start = current.file.timestamp

            if current_start <= previous_start:
                raise ValueError(
                    f"Files for extractor {all_extracted[i].extractor.name} are not in chronological order."
                    f"\nCurrent file index: {current.file.index}, previous file index: {previous.file.index}"
                    f"\nCurrent file timestamp: {convert_timestamp_to_date_string(current.file.timestamp)}"
                    f", previous file index: {convert_timestamp_to_date_string(previous.file.timestamp)}"
                )

    def add(self, extracted_by_extractor_index: ExtractedByExtractorIndex) -> None:
        """Add extracted data to the timeline."""
        for extractor_index, all_extracted in extracted_by_extractor_index.items():
            self._validate_chrono(all_extracted)

            for extracted in all_extracted:
                slices = self._slice(extracted)
                self.slices[extractor_index].extend(slices)

                # Update timestamp boundaries as we add data
                for slice_data in slices:
                    if (
                        self._earliest_timestamp is None
                        or slice_data.astart < self._earliest_timestamp
                    ):
                        self._earliest_timestamp = slice_data.astart
                    if (
                        self._latest_timestamp is None
                        or slice_data.aend > self._latest_timestamp
                    ):
                        self._latest_timestamp = slice_data.aend

    def _find_overlapping_slices(
        self,
        interval_start: int,
        interval_end: int,
    ) -> list[TimelineSlice]:
        """Find slices that overlap with the given time interval."""
        overlaps: list[TimelineSlice] = []

        for _, slices in self.slices.items():
            results = [
                s for s in slices if s.astart < interval_end and s.aend > interval_start
            ]
            overlaps.extend(results)

        return overlaps

    def _find_boundaries(
        self,
        integration_ms: int,
    ) -> tuple[int, int]:
        """
        Determine optimal time boundaries for aggregation.

        Returns:
            A tuple of (`aligned_start`, `end`) in milliseconds.
        """
        if self._earliest_timestamp is None or self._latest_timestamp is None:
            raise Exception("No slices found")

        config_origin = self.context.config.settings.timeline_origin
        start_position = max(config_origin, self._earliest_timestamp)
        aligned_start = (
            (start_position + integration_ms - 1) // integration_ms
        ) * integration_ms

        return aligned_start, self._latest_timestamp

    # todo: store me? (later)
    @staticmethod
    def _aggregate_labels(
        slices: list[TimelineSlice],
    ) -> dict[str, str]:
        """Aggregate labels from files dynamically."""
        all_labels: dict[str, list[str]] = defaultdict(list)
        tags: dict[str, str] = {}

        for s in slices:
            for key, value in s.file.tags.items():
                all_labels[key].append(value)

        for key, values in all_labels.items():
            tags[key] = STRING_DELIMITER.join(set(values))

        return tags

    def aggregate(
        self,
        integration_ms: int,
    ) -> list[TimelineAggregate]:
        """
        Aggregate timeline data over specified time intervals.

        Args:
            integration_ms: The integration window size in milliseconds

        Returns:
            List of AggregatedData objects
        """
        start_position, end_position = self._find_boundaries(integration_ms)

        # Optimization: Create an index of time intervals to slices
        time_index = self._build_time_index(
            start_position,
            end_position,
            integration_ms,
        )

        total_steps = (end_position - start_position) // integration_ms
        aggregates: list[TimelineAggregate] = []

        with Progress(console=Console.console) as progress:
            task = progress.add_task(
                f"Aggregating at {integration_ms//1000}s...",
                total=total_steps,
            )

            position = start_position
            step = 0

            while position < end_position:
                interval_end = position + integration_ms

                # Use the time index to efficiently get overlapping slices
                interval_key = position // integration_ms
                if interval_key in time_index and time_index[interval_key]:
                    overlaps = time_index[interval_key]

                    # Process concurrent slices from different extractors properly
                    grouped_by_extractor = self._group_concurrent_slices(overlaps)
                    embeddings = self._aggregate_grouped_embeddings(
                        grouped_by_extractor
                    )

                    aggregate = TimelineAggregate(
                        embeddings=embeddings,
                        slices=overlaps,
                        start=position,
                        end=interval_end,
                    )

                    aggregates.append(aggregate)

                position += integration_ms
                step += 1
                progress.update(task, completed=step)

        return aggregates

    def _build_time_index(
        self,
        start: int,
        end: int,
        window_ms: int,
    ) -> dict[int, list[TimelineSlice]]:
        """
        Build an index mapping time intervals to slices for more efficient retrieval.

        Returns:
            Dictionary mapping interval keys to lists of slices
        """
        time_index = defaultdict(list)

        # Iterate through all slices and assign them to their relevant time intervals
        for _, slices in self.slices.items():
            for slice_data in slices:
                # Find all intervals this slice overlaps with
                start_interval = slice_data.astart // window_ms
                end_interval = (slice_data.aend - 1) // window_ms + 1

                for interval in range(start_interval, end_interval):
                    interval_start = interval * window_ms
                    # interval_end = interval_start + window_ms

                    # Only include if `interval` is within our processing range
                    if start <= interval_start < end:
                        time_index[interval].append(slice_data)

        return time_index

    @staticmethod
    def _group_concurrent_slices(
        slices: list[TimelineSlice],
    ) -> dict[_ExtractorIndex, list[TimelineSlice]]:
        """Group slices by extractor for proper concurrent processing."""
        grouped = defaultdict(list)
        for s in slices:
            grouped[s.extractor.index].append(s)
        return grouped

    @staticmethod
    def _aggregate_grouped_embeddings(
        grouped_slices: dict[_ExtractorIndex, list[TimelineSlice]],
    ) -> np.ndarray:
        """
        Aggregate embeddings from multiple extractors by first averaging within each extractor,
        then concatenating across extractors.

        For example, if two VGGish instances each produce 128d embeddings for the same time period,
        the result will be a 256d concatenated embedding.
        """
        # First aggregate within each extractor
        extractor_embeddings = []

        # Process extractors in a consistent order (sorted by index) for deterministic results
        for extractor_idx in sorted(grouped_slices.keys()):
            extractor_slices = grouped_slices[extractor_idx]
            if extractor_slices:
                # Average embeddings from the same extractor
                mean_embedding = np.mean(
                    [s.embeddings for s in extractor_slices], axis=0
                )
                extractor_embeddings.append(mean_embedding)

        # Then concatenate across extractors (not average)
        if extractor_embeddings:
            return np.concatenate(extractor_embeddings)
        else:
            # Should never happen if we're called with non-empty grouped_slices
            raise ValueError("No embeddings to aggregate")
