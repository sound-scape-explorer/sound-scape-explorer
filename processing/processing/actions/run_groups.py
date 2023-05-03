from processing.common.Env import Env
from processing.groupers.FeaturesGrouper import FeaturesGrouper
from processing.storage.Storage import Storage


def run_groups(env: Env):
    storage = Storage(path=env.storage)

    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()

    storage.delete_groups()

    grouper = FeaturesGrouper()
    timestamps = storage.get_timestamps()
    grouper.set_timestamps(timestamps)

    for band in bands:
        features = storage.get_features(band)
        grouper.set_features(features)

        for integration in integrations:
            group_features, group_timestamps = grouper.group(integration)
            storage.create_group(
                features=group_features,
                timestamps=group_timestamps,
                band=band,
                integration=integration,
            )


if __name__ == "__main__":
    env = Env()
    run_groups(env)
