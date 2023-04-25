from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line
from processing.volumes.Volume import Volume

env = Env()
storage = Storage(path=env.storage)

files = storage.read_config_files()
bands = storage.get_bands()
integrations = storage.get_integrations_seconds()
volumes = storage.read_volumes()
meta_properties = storage.read_meta_properties()

if len(volumes) > 0:
    storage.delete_volumes()

    print_new_line()
    print(f'Volumes loading: {[v for v in volumes]}')

    timer = Timer(
        len(bands) * len(integrations) * len(volumes) * len(meta_properties)
    )

    for band in bands:
        for integration in integrations:
            grouped_features = storage.read_grouped_features_all_files(
                band=band,
                integration=integration,
                unwrap=True,
            )

            meta_values = storage.read_meta_values(band, integration)

            for volume_index, volume_name in enumerate(volumes):
                for meta_index in storage.enumerate_meta_properties():
                    meta_property = meta_properties[meta_index]
                    meta_property_values = meta_values[meta_index]

                    v = Volume(
                        name=volume_name,
                        band=band,
                        integration=integration,
                        volume_index=volume_index,
                        meta_index=meta_index,
                        features=grouped_features,
                        labels=meta_property_values,
                    )

                    v.calculate()
                    v.store(storage)
                    timer.progress()
