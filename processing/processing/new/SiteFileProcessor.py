from dataclasses import dataclass

import numpy as np

from processing.constants import DELIMITER
from processing.context import Context
from processing.extractors.Extractor import Extractor
from processing.new.BandConfigNew import BandConfigNew
from processing.new.FileConfigNew import FileConfigNew, FileLabels
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.SoundLoaderNew import SoundLoaderNew
from processing.new.TorchLoaderNew import TorchLoaderNew
from processing.new.logger import log_debug


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


class SiteFileProcessor:
    def __init__(
        self,
        site: str,
        files: list[FileConfigNew],
        context: Context,
        extractors_instances: list[Extractor],
        indices_instances: list[Extractor],
    ):
        self.site = site
        self.files = sorted(files, key=lambda f: f.timestamp)
        self.context = context
        self.extractors_instances = extractors_instances
        self.indices_instances = indices_instances
        self.torch_loaders: dict[FileIndex, TorchLoaderNew] = {}
        self.torch_cache: dict[CacheKey, RawData] = {}
        self.sound_loaders: dict[FileIndex, SoundLoaderNew] = {}

    def _create_intervals(self, integration: IntegrationConfigNew):
        intervals: list[_Interval] = []
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

    def _process_file(
        self,
        file: FileConfigNew,
        band: BandConfigNew,
        extractor: Extractor,
        interval: _Interval,
        all_sliced: SlicedData,
    ):
        torch_loader, sound_loader = self._get_loaders(file, band)
        raw = self._get_data(file, band, extractor, torch_loader)
        sliced = self._slice_data(raw, file, extractor, interval)

        # adding to sliced pool
        all_sliced.extend(sliced)

    @staticmethod
    def _merge_labels(
        file: FileConfigNew,
        all_labels: FileLabels,
    ):
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
        all_files: list[FileConfigNew],
    ):
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

            # merging labels
            self._merge_labels(file, all_labels)

            # referencing files for future release
            if file not in all_files:
                all_files.append(file)

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

    def walk(self):
        integrations = self.context.config.integrations
        bands = self.context.config.bands

        for integration in integrations:
            intervals = self._create_intervals(integration)
            log_debug(f"starting {len(intervals)} intervals")

            for interval in intervals:
                all_files: list[FileConfigNew] = []

                for band in bands:
                    for extractor in self.extractors_instances:
                        yield self._process_band_extractor(
                            band=band,
                            extractor=extractor,
                            integration=integration,
                            interval=interval,
                            all_files=all_files,
                        )

                    for index in self.indices_instances:
                        yield self._process_band_extractor(
                            band=band,
                            extractor=index,
                            integration=integration,
                            interval=interval,
                            all_files=all_files,
                        )

                for file in all_files:
                    self._can_release(file, interval)

            log_debug(f"ending {len(intervals)} intervals")

    def _get_loaders(
        self,
        file: FileConfigNew,
        band: BandConfigNew,
    ):
        if file.index in self.torch_loaders and file.index in self.sound_loaders:
            return self.torch_loaders[file.index], self.sound_loaders[file.index]

        log_debug(f"load torch for file {file.index}")

        torch_loader = TorchLoaderNew()
        torch_loader.load(file)
        self.torch_loaders[file.index] = torch_loader

        sound_loader = SoundLoaderNew()
        sound_loader.load(file, band)
        self.sound_loaders[file.index] = sound_loader

        return torch_loader, sound_loader

    def _can_release(
        self,
        file: FileConfigNew,
        interval: _Interval,
    ):
        if file.end > interval.end:
            return

        log_debug(f"release torch for file {file.index}")

        self._release_loader(file)

        for band in self.context.config.bands:
            for extractor in self.extractors_instances:
                self._release_torch_cache(file, band, extractor)

    def _release_loader(self, file: FileConfigNew):
        if file.index not in self.torch_loaders:
            raise Exception(
                f"Attempted to release loader for file {file.index} that was not loaded"
            )

        self.torch_loaders[file.index].release()
        del self.torch_loaders[file.index]

        self.sound_loaders[file.index].release()
        del self.sound_loaders[file.index]

    def _release_torch_cache(
        self,
        file: FileConfigNew,
        band: BandConfigNew,
        extractor: Extractor,
    ):
        key = self._get_cache_key(file, band, extractor)

        if key not in self.torch_cache:
            raise Exception(
                f"Attempted to release cache entry {key} that does not exist"
            )

        del self.torch_cache[key]

    @staticmethod
    def _get_cache_key(
        file: FileConfigNew,
        band: BandConfigNew,
        extractor: Extractor,
    ):
        return file.index, band.index, extractor.index

    def _get_data(
        self,
        file: FileConfigNew,
        band: BandConfigNew,
        extractor: Extractor,
        loader: TorchLoaderNew,
    ):
        key = self._get_cache_key(file, band, extractor)

        if key in self.torch_cache:
            return self.torch_cache[key]

        extractor.band = band
        raw = extractor.extract(loader)
        self.torch_cache[key] = raw
        return raw

    @staticmethod
    def _slice_data(
        raw: RawData,
        file: FileConfigNew,
        extractor: Extractor,
        interval: _Interval,
    ) -> SlicedData:
        offset_ms = extractor.offset
        step_ms = extractor.step

        rel_start = max(0, interval.start - file.timestamp)
        rel_end = min(file.duration, interval.end - file.timestamp)

        start = (rel_start + offset_ms) // step_ms
        end = min((rel_end + offset_ms) // step_ms, len(raw))

        return raw[start:end] if start < len(raw) else []

    @staticmethod
    def _aggregate(sliced: SlicedData) -> AggregatedData:
        if not sliced:
            return []

        np_data = np.array(sliced)
        return np.mean(np_data, axis=0).tolist()
