from typing import List

import numpy

from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.is_within_interval import is_within_interval
from processing.utils.print_new_line import print_new_line


# INFO: This step can be very long. Find a way to reduce processing time?
# TODO: Reduce cognitive complexity
def run_groups(env: Env):
    storage = Storage(env.storage)
    storage.delete_groups()

    bands = storage.read_config_bands()
    integrations = storage.read_config_integrations()

    files = storage.read_config_files()
    files_durations = storage.read_files_durations()

    timestamp_end = -1

    # Finding timestamp_end
    for file in files:
        timestamp = file.timestamp
        interval_duration = files_durations[file.index][0] * 1000  # milliseconds
        end = timestamp + interval_duration

        if end <= timestamp_end:
            continue

        timestamp_end = end

    grouping_start = storage.read_grouping_start()
    sites = storage.read_sites()

    for band in bands:
        files_features = storage.read_files_features(band)

        for integration in integrations:
            interval_duration = integration.duration * 1000  # milliseconds
            interval_index = 0
            interval_start = grouping_start

            print_new_line()
            print(f"Grouping for band {band.name}, integration {integration.name}.")
            timer = Timer((timestamp_end - interval_start) // interval_duration)

            while interval_start < timestamp_end:
                interval_end = interval_start + interval_duration

                # Iterating over sites
                for site in sites:
                    # INFO: This can contain features from multiple files.
                    features_chunks: List[List[float]] = []

                    # Iterating over files defined by the current site
                    for file in site.files:
                        # Defining file timestamps
                        file_duration = files_durations[file.index][0] * 1000
                        file_start = file.timestamp
                        file_end = file_start + file_duration

                        # Skipping file if not in interval
                        if not is_within_interval(
                            interval_start=interval_start,
                            interval_end=interval_end,
                            data_start=file_start,
                            data_end=file_end,
                        ):
                            continue

                        # Finding `files_features` array positions
                        position_start = int((interval_start - file_start) / 1000)

                        for f in files:
                            if f.index == file.index:
                                break
                            position_start += files_durations[f.index][0]

                        position_end = position_start + integration.duration

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
