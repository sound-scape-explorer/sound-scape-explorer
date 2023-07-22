from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_volumes(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_volumes()

    volumes = storage.read_config_volumes()

    if len(volumes) == 0:
        return

    meta_properties = storage.read_meta_properties()

    print_new_line()
    print(f"Volumes list {[v.name for v in volumes]}")

    for band, integration in storage.enumerate_bands_and_integrations():
        print(
            f"Volumes loaded for band {band.name}"
            f", integration {integration.duration}"
        )

        grouped_features = storage.read_grouped_features_all_files(
            band=band,
            integration=integration,
        )

        timer = Timer(len(volumes) * len(meta_properties))

        meta_values = storage.read_grouped_meta_values(
            band=band,
            integration=integration,
        )

        for volume in volumes:
            for meta_index in storage.enumerate_meta_properties():
                instance = volume.create_instance(
                    band=band,
                    integration=integration,
                    meta_index=meta_index,
                )

                instance.load(
                    features=grouped_features[:],
                    labels=meta_values[meta_index],
                )

                instance.calculate()

                storage.write_volume(volume=volume)

                timer.progress()


if __name__ == "__main__":
    env = Env()
    run_volumes(env)
