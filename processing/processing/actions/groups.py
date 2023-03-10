from processing.common.Env import Env
from processing.groupers.FeaturesGrouper import FeaturesGrouper
from processing.storage.Storage import Storage

env = Env()
storage = Storage(path=env.storage)

bands = storage.get_bands()
integrations = storage.get_integrations_seconds()

storage.delete_groups()

grouper = FeaturesGrouper()

for band in bands:
    features = storage.get_features(band)
    timestamps = storage.get_timestamps()

    grouper.set_features(features)
    grouper.set_timestamps(timestamps)

    for integration in integrations:
        grouped_features, grouped_timestamps = grouper.group(integration)
        storage.create_grouped_features(grouped_features, band, integration)
        storage.create_grouped_timestamps(grouped_timestamps, band, integration)
