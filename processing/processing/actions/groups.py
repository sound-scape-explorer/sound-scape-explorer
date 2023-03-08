from processing.common.Env import Env
from processing.groupers.FeaturesGrouper import FeaturesGrouper
from processing.storage.Storage import Storage

env = Env()
storage = Storage(path=env.storage)

files = storage.get_files()
bands = storage.get_bands()
integrations = storage.get_integrations_seconds()

storage.delete_groups()

for band in bands:
    for integration in integrations:
        for file_index, _ in enumerate(files):
            grouper = FeaturesGrouper(
                storage=storage,
                integration=integration,
            )

            group_features, group_timestamps = grouper.get_group(
                band=band,
                file_index=file_index,
            )

            storage.create_group_features(
                features=group_features,
                band=band,
                integration=integration,
                file_index=file_index,
            )

            storage.create_group_timestamps(
                timestamps=group_timestamps,
                band=band,
                integration=integration,
                file_index=file_index,
            )
