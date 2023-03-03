from processing.storage.Storage import Storage
from processing.volumes.Volume import Volume

storage = Storage(path='./sample/sse.h5')

files = storage.get_files()
bands = storage.get_bands()
integrations = storage.get_integrations_seconds()
volumes = storage.get_volumes()

storage.delete_volumes()

for band in bands:
    for integration in integrations:
        for file_index, _ in enumerate(files):
            grouped_features = storage.get_grouped_features(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for name in volumes:
                volume = Volume(
                    name=name,
                    band=band,
                    integration=integration,
                    file_index=file_index,
                )

                for group_index, features in enumerate(grouped_features):
                    volume.calculate(features)

                volume.store(storage)
