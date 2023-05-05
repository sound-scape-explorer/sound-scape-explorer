from typing import List

from processing.common.Env import Env
from processing.groupers.FeaturesGrouper import FeaturesGrouper
from processing.storage.Storage import Storage


def run_groups(env: Env):
    storage = Storage(path=env.storage)

    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()
    timestamps = storage.get_timestamps()

    storage.delete_groups()

    grouper = FeaturesGrouper()
    grouper.set_timestamps(timestamps)

    for band in bands:
        features, files_count, seconds = storage.read_features(band)

        sliced_features: List[List[List[float]]] = []

        for f in range(files_count):
            sliced_features.append([])
            for s in range(seconds):
                sliced_features[f].append([])

        i = 0
        for f in range(files_count):
            for s in range(seconds):
                sliced_features[f][s] = features[i]
                i += 1

        grouper.set_features(sliced_features)  # type: ignore

        for integration in integrations:
            grouped_features, grouped_timestamps = grouper.group(integration)

            storage.write_group(
                features=grouped_features,
                timestamps=grouped_timestamps,
                band=band,
                integration=integration,
            )


if __name__ == "__main__":
    env = Env()
    run_groups(env)
