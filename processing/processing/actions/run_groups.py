import numpy

from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.constants import TIME_DELTA_MS
from processing.groupers.FeaturesGrouper import FeaturesGrouper
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_groups(env: Env):
    storage = Storage(path=env.storage)

    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()
    timestamps = storage.get_timestamps()

    storage.delete_groups()

    grouper = FeaturesGrouper()
    grouper.set_timestamps(timestamps)

    for band in bands:
        files_features, files_durations, files_count = storage.read_features(band)

        print_new_line()

        print(f'Grouping for band "{band}"')

        timer = Timer(files_count * len(integrations))
        duration_position = 0

        for file_index in range(files_count):
            seconds = files_durations[file_index]
            duration_start = duration_position
            duration_end = duration_position + seconds

            duration_position = duration_end

            file_features = files_features[duration_start:duration_end]

            grouper.set_features(file_features)
            file_timestamp = timestamps[file_index]

            for integration in integrations:
                # Floor division will discard any incomplete group slice
                # TODO: Timeline strategy: Handle audio lengths shorter than integration
                # We should only discard the slice when there is no audio at all
                groups_count = len(file_features) // integration

                for group_index in range(groups_count):
                    group_start = group_index * integration
                    group_end = (group_index + 1) * integration

                    features_to_group = file_features[group_start:group_end]

                    group_duration = len(features_to_group)

                    group_features = list(numpy.mean(features_to_group, axis=0))

                    group_timestamp = (
                        file_timestamp + integration * group_index * TIME_DELTA_MS
                    )

                    # At the moment, each integration result in a write
                    # Writes could be merged for each group to improve performance
                    # But the current strategy is to be as narrow as possible
                    storage.append_group(
                        features=group_features,
                        timestamp=group_timestamp,
                        duration=group_duration,
                        band=band,
                        integration=integration,
                    )

                timer.progress()


if __name__ == "__main__":
    env = Env()
    run_groups(env)
