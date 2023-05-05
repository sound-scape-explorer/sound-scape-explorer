from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line
from processing.volumes.Volume import Volume


def run_volumes(env: Env):
    storage = Storage(path=env.storage)

    volumes = storage.read_volumes()

    if len(volumes) == 0:
        return

    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()
    meta_properties = storage.read_meta_properties()

    storage.delete_volumes()

    print_new_line()
    print(f"Volumes loading: {[v for v in volumes]}")

    timer = Timer(len(bands) * len(integrations) * len(volumes) * len(meta_properties))

    for band in bands:
        for integration in integrations:
            grouped_features = storage.read_grouped_features_all_files(
                band=band,
                integration=integration,
            )

            meta_values = storage.read_meta_values(band, integration)

            for volume_index, volume_name in enumerate(volumes):
                for meta_index in storage.enumerate_meta_properties():
                    meta_property_values = meta_values[meta_index]

                    volume = Volume(
                        name=volume_name,
                        band=band,
                        integration=integration,
                        volume_index=volume_index,
                        meta_index=meta_index,
                        features=grouped_features[:],
                        labels=meta_property_values,
                    )

                    if volume is None:
                        continue

                    volume.calculate()
                    volume.store(storage)
                    timer.progress()


if __name__ == "__main__":
    env = Env()
    run_volumes(env)
