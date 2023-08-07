from typing import List

import numpy

from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.config.SiteStorage import SiteStorage
from processing.storage.Storage import Storage
from processing.utils.is_within_interval import is_within_interval
from processing.utils.print_new_line import print_new_line


# TODO: Reduce cognitive complexity
# TODO: To reduce length of this process, use an empty hash map that will be
# filled by a new class `Extractors`.
# Extractors take audio as inputs, they will merge previous `Models` and `Indicators`
def run_groups(env: Env):
    storage = Storage(env.storage)
    storage.delete_groups()

    bands = storage.read_config_bands()
    integrations = storage.read_config_integrations()

    files = storage.read_config_files()

    timestamp_start = None
    timestamp_end = None

    # Finding timestamp min and max
    for file in files:
        if timestamp_end is None or file.end > timestamp_end:
            timestamp_end = file.end

        if timestamp_start is None or file.start < timestamp_start:
            timestamp_start = file.start

    sites = SiteStorage.read_from_storage(storage)

    for band in bands:
        files_features = storage.read_files_features(band)

        for integration in integrations:
            if timestamp_start is None or timestamp_end is None:
                raise RuntimeError("Unable to specify timestamps.")

            interval_duration = integration.milliseconds
            interval_index = 0
            interval_start = timestamp_start

            print_new_line()
            print(f"Grouping for band {band.name}, integration {integration.name}.")
            timer = Timer(((timestamp_end - interval_start) // interval_duration) + 1)

            while interval_start < timestamp_end:
                interval_end = interval_start + interval_duration

                # Iterating over sites
                for site in sites:
                    # INFO: This can contain features from multiple files.
                    features_chunks: List[List[float]] = []

                    # Iterating over files defined by the current site
                    for file in site.files:
                        # Skipping file if not in interval
                        if not is_within_interval(
                            interval_start=interval_start,
                            interval_end=interval_end,
                            data_start=file.start,
                            data_end=file.end,
                        ):
                            continue

                        # Finding `files_features` array positions
                        position_start = int((interval_start - file.start) / 1000)

                        for f in files:
                            if f.index == file.index:
                                break
                            position_start += file.seconds

                        position_end = position_start + integration.milliseconds

                        # DEBUG: Print matches
                        # print(
                        #     interval_index,
                        #     site.index,
                        #     file.index,
                        #     position_start,
                        #     position_end,
                        #     file_start,
                        #     file_end,
                        #     interval_start,
                        #     interval_end,
                        # )

                        # Slicing `files_features`
                        features_chunk = files_features[position_start:position_end]
                        features_chunks.append(features_chunk)

                    # Handling features chunks
                    if len(features_chunks) == 0:
                        continue

                    # Flatten features chunks
                    features_flat = [f for fc in features_chunks for f in fc]
                    features_meaned = list(numpy.mean(features_flat, axis=0))

                    storage.append_group(
                        band=band,
                        integration=integration,
                        site=site,
                        features=features_meaned,
                        timestamp=interval_start,
                    )

                interval_index += 1
                interval_start += interval_duration
                timer.progress()


if __name__ == "__main__":
    env = Env()
    run_groups(env)
