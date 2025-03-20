import concurrent.futures
import threading
from dataclasses import dataclass
from typing import Dict, List, Optional, Iterator, Tuple

import numpy as np

from processing.constants import DELIMITER
from processing.context import Context
from processing.extractors.Extractor import Extractor
from processing.new.BandConfigNew import BandConfigNew
from processing.new.FileConfigNew import FileConfigNew, FileLabels
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.TorchLoaderNew import TorchLoaderNew
from processing.new.logger import get_logger, log_debug


FileIndex = int
BandIndex = int
ExtractorIndex = int
CacheKey = tuple[FileIndex, BandIndex, ExtractorIndex]
RawData = list[list[float]]
SlicedData = RawData
AggregatedData = list[float]


@dataclass
class _Interval:
    start: int
    end: int
    files: list[FileConfigNew]
    integration: IntegrationConfigNew


@dataclass
class ProcessorPayload:
    aggregated_data: AggregatedData
    sliced_data: SlicedData
    integration: IntegrationConfigNew
    band: BandConfigNew
    extractor: Extractor
    interval: _Interval
    site_name: str
    labels: FileLabels


class DataCache:
    """Caches extracted data to avoid redundant processing"""

    def __init__(self):
        self.cache: Dict[CacheKey, RawData] = {}
        self.lock = threading.RLock()

    def get(self, key: CacheKey) -> Optional[RawData]:
        """Get cached data if available"""
        with self.lock:
            return self.cache.get(key)

    def store(self, key: CacheKey, data: RawData) -> None:
        """Store data in cache"""
        with self.lock:
            self.cache[key] = data

    def release(self, key: CacheKey) -> None:
        """Release a specific cache entry"""
        with self.lock:
            if key in self.cache:
                del self.cache[key]

    def release_for_file(self, file_index: FileIndex) -> None:
        """Release all cache entries for a specific file"""
        with self.lock:
            log_debug("Releasing cache entries for file {}".format(file_index))
            keys_to_remove = [key for key in self.cache if key[0] == file_index]
            for key in keys_to_remove:
                del self.cache[key]


class FileManager:
    """Manages file loading, access, and releasing"""

    def __init__(self):
        self.loaders: Dict[FileIndex, TorchLoaderNew] = {}
        self.data_cache = DataCache()
        self.lock = threading.RLock()
        # Track which files are still needed by remaining intervals
        self.file_usage_count: Dict[FileIndex, int] = {}

    def register_file_usage(self, files: List[FileConfigNew]) -> None:
        """Register that these files will be used by an interval"""
        with self.lock:
            for file in files:
                if file.index in self.file_usage_count:
                    self.file_usage_count[file.index] += 1
                else:
                    self.file_usage_count[file.index] = 1

    def get_loader(self, file: FileConfigNew) -> TorchLoaderNew:
        """Get or create a loader for the specified file"""
        with self.lock:
            if file.index not in self.loaders:
                log_debug(f"Loading file {file.index}")
                loader = TorchLoaderNew()
                loader.load(file.absolute_path)
                self.loaders[file.index] = loader
            return self.loaders[file.index]

    def release_loader(self, file: FileConfigNew) -> None:
        """Release a specific file loader and its cached data"""
        with self.lock:
            if file.index in self.loaders:
                log_debug(f"Releasing file {file.index}")
                self.loaders[file.index].release()
                del self.loaders[file.index]
                # Also release any cached data for this file
                self.data_cache.release_for_file(file.index)

    def mark_interval_completed(self, files: List[FileConfigNew]) -> None:
        """Mark that an interval no longer needs these files, releasing if no longer needed"""
        with self.lock:
            for file in files:
                if file.index in self.file_usage_count:
                    self.file_usage_count[file.index] -= 1
                    # If no more intervals need this file, release it
                    if self.file_usage_count[file.index] <= 0:
                        self.release_loader(file)
                        del self.file_usage_count[file.index]

    def get_data(
        self,
        file: FileConfigNew,
        band: BandConfigNew,
        extractor: Extractor,
    ) -> RawData:
        """Get data from cache or extract it if not available"""
        key = (file.index, band.index, extractor.index)

        # Try to get from cache first
        cached_data = self.data_cache.get(key)
        if cached_data is not None:
            return cached_data

        # Not in cache, need to extract
        loader = self.get_loader(file)
        extractor.band = band
        raw = extractor.extract(loader)
        self.data_cache.store(key, raw)
        return raw

    def release_all(self) -> None:
        """Release all loaders and cached data - emergency cleanup"""
        with self.lock:
            for file_index, loader in list(self.loaders.items()):
                log_debug(f"Releasing file {file_index}")
                loader.release()
            self.loaders.clear()
            self.file_usage_count.clear()


class IntervalManager:
    """Creates and manages all intervals upfront for parallel processing"""

    def __init__(self, files: List[FileConfigNew], context: Context):
        self.files = sorted(files, key=lambda f: f.timestamp)
        self.context = context
        self.intervals_by_integration: Dict[int, List[_Interval]] = {}
        self._create_all_intervals()

    def _create_all_intervals(self) -> None:
        """Pre-create all intervals for all integrations"""
        log_debug("Creating all intervals upfront")
        for integration in self.context.config.integrations:
            self.intervals_by_integration[integration.index] = self._create_intervals(
                integration
            )

    def _create_intervals(self, integration: IntegrationConfigNew) -> List[_Interval]:
        """Create intervals for a specific integration"""
        intervals: List[_Interval] = []
        interval_size_ms = integration.duration
        origin = self.context.config.settings.timeline_origin
        start_time = min(origin, self.files[0].timestamp) if self.files else origin
        end_time = self.files[-1].end if self.files else start_time
        active_files = []
        total_files = len(self.files)
        i = 0
        current_time = start_time

        while current_time < end_time:
            interval_end = current_time + interval_size_ms

            # Add to active files, with bounds checking
            while i < total_files and self.files[i].start < interval_end:
                active_files.append(self.files[i])
                i += 1

            # Purge from active files
            active_files = [f for f in active_files if f.end > current_time]

            if active_files:
                intervals.append(
                    _Interval(
                        start=current_time,
                        end=interval_end,
                        files=active_files.copy(),
                        integration=integration,
                    )
                )

            current_time = interval_end

            # Break if we've processed all files and there are no more active files
            if i >= total_files and not active_files:
                break

        return intervals

    def get_intervals(self, integration: IntegrationConfigNew) -> List[_Interval]:
        """Get all intervals for a specific integration"""
        return self.intervals_by_integration.get(integration.index, [])

    def get_all_intervals(self) -> List[Tuple[IntegrationConfigNew, List[_Interval]]]:
        """Get all integrations with their intervals"""
        result = []
        for integration in self.context.config.integrations:
            intervals = self.intervals_by_integration.get(integration.index, [])
            if intervals:
                result.append((integration, intervals))
        return result


class SiteFileProcessor:
    """Processes site files with improved performance and resource management"""

    def __init__(
        self,
        site: str,
        files: List[FileConfigNew],
        context: Context,
        extractors_instances: List[Extractor],
        indices_instances: List[Extractor],
    ):
        self.site = site
        self.files = sorted(files, key=lambda f: f.timestamp)
        self.context = context
        self.extractors_instances = extractors_instances
        self.indices_instances = indices_instances

        # Initialize composite components
        self.file_manager = FileManager()
        self.interval_manager = IntervalManager(files, context)

        # Register file usage for all intervals upfront
        self._register_file_usage()

    def _register_file_usage(self) -> None:
        """Register all file usages across all intervals"""
        for integration, intervals in self.interval_manager.get_all_intervals():
            for interval in intervals:
                self.file_manager.register_file_usage(interval.files)

    def _process_file(
        self,
        file: FileConfigNew,
        band: BandConfigNew,
        extractor: Extractor,
        interval: _Interval,
        all_sliced: SlicedData,
    ) -> None:
        """Process a single file for a specific band and extractor"""
        raw = self.file_manager.get_data(file, band, extractor)
        sliced = self._slice_data(raw, file, extractor, interval)
        all_sliced.extend(sliced)

    @staticmethod
    def _slice_data(
        raw: RawData,
        file: FileConfigNew,
        extractor: Extractor,
        interval: _Interval,
    ) -> SlicedData:
        """Slice raw data based on interval bounds"""
        offset_ms = extractor.offset
        step_ms = extractor.step

        rel_start = max(0, interval.start - file.timestamp)
        rel_end = min(file.duration, interval.end - file.timestamp)

        start = (rel_start + offset_ms) // step_ms
        end = min((rel_end + offset_ms) // step_ms, len(raw))

        return raw[start:end] if start < len(raw) else []

    @staticmethod
    def _aggregate(sliced: SlicedData) -> AggregatedData:
        """Aggregate sliced data"""
        if not sliced:
            return []

        np_data = np.array(sliced)
        return np.mean(np_data, axis=0).tolist()

    @staticmethod
    def _merge_labels(
        file: FileConfigNew,
        all_labels: FileLabels,
    ) -> None:
        """Merge labels from a file into the accumulated labels"""
        for key, value in file.labels.items():
            if key not in all_labels:
                all_labels[key] = value
                continue

            all_labels[key] = DELIMITER.join(
                [
                    all_labels[key],
                    value,
                ]
            )

    def _process_band_extractor(
        self,
        band: BandConfigNew,
        extractor: Extractor,
        interval: _Interval,
        integration: IntegrationConfigNew,
    ) -> ProcessorPayload:
        """Process a specific band and extractor for an interval"""
        all_sliced: SlicedData = []
        all_labels: FileLabels = {}

        for file in interval.files:
            self._process_file(
                file=file,
                band=band,
                extractor=extractor,
                interval=interval,
                all_sliced=all_sliced,
            )

            # Merge labels
            self._merge_labels(file, all_labels)

        aggregated = self._aggregate(all_sliced)

        payload = ProcessorPayload(
            aggregated_data=aggregated,
            sliced_data=all_sliced,
            integration=integration,
            band=band,
            extractor=extractor,
            interval=interval,
            site_name=self.site,
            labels=all_labels,
        )

        return payload

    def _process_integration(
        self,
        integration: IntegrationConfigNew,
        intervals: List[_Interval],
    ) -> List[ProcessorPayload]:
        """Process all intervals for a specific integration"""
        results = []
        bands = self.context.config.bands

        log_debug(
            f"Processing integration {integration.index} with {len(intervals)} intervals"
        )

        for interval in intervals:
            interval_results = []
            for band in bands:
                for extractor in self.extractors_instances:
                    payload = self._process_band_extractor(
                        band=band,
                        extractor=extractor,
                        integration=integration,
                        interval=interval,
                    )
                    interval_results.append(payload)

            # After processing this interval, mark these files as potentially releasable
            self.file_manager.mark_interval_completed(interval.files)
            results.extend(interval_results)

        return results

    def walk(self) -> Iterator[ProcessorPayload]:
        """Process site data with optimized file management"""
        integration_intervals = self.interval_manager.get_all_intervals()

        try:
            # Use ThreadPoolExecutor for parallel integration processing
            with concurrent.futures.ThreadPoolExecutor() as executor:
                # Submit tasks for each integration
                futures = {}
                for integration, intervals in integration_intervals:
                    future = executor.submit(
                        self._process_integration,
                        integration=integration,
                        intervals=intervals,
                    )
                    futures[future] = integration.index

                # Process results as they complete
                for future in concurrent.futures.as_completed(futures):
                    integration_index = futures[future]
                    try:
                        results = future.result()
                        log_debug(
                            f"Completed integration {integration_index} with {len(results)} results"
                        )
                        for result in results:
                            yield result
                    except Exception as e:
                        get_logger().error(
                            f"Error processing integration {integration_index}: {e}",
                            exc_info=True,
                        )
        finally:
            # Final cleanup in case of any issues
            self.file_manager.release_all()
