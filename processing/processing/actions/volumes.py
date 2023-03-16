from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line
from processing.volumes.Volume import Volume

env = Env()
storage = Storage(path=env.storage)

files = storage.get_files()
bands = storage.get_bands()
integrations = storage.get_integrations_seconds()
volumes = storage.get_volumes()

storage.delete_volumes()

print_new_line()
print(f'Volumes loading {[v for v in volumes]}')

timer = Timer(len(bands) * len(integrations) * len(files) * len(volumes))

for band in bands:
    for integration in integrations:
        for file_index in storage.enumerate_file_indexes():
            grouped_features = storage.get_grouped_features(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for v, name in enumerate(volumes):
                volume = Volume(
                    name=name,
                    band=band,
                    integration=integration,
                    file_index=file_index,
                )

                for group_index, features in enumerate(grouped_features):
                    volume.calculate(features)

                volume.store(storage, v)
                timer.progress()
