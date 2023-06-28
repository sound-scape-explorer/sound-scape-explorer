import numpy

from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.constants import TIME_DELTA_MS
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_groups(env: Env):
    storage = Storage(path=env.storage)

    storage.delete_groups()

    for band, integration in storage.enumerate_bands_and_integrations():
        files_count = storage.read_files_count(band=band)

        print_new_line()

        print(f'Grouping for band "{band}", integration {integration}')

        timer = Timer(files_count)

        for (
            _,
            groups_count,
            _,
            file_timestamp,
            file_features,
        ) in storage.enumerate_files(band=band, integration=integration):
            groups_count = storage.get_groups_count(
                file_features=file_features, integration=integration
            )

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
