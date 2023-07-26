from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_pairings(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_pairings()

    pairings = storage.read_config_pairings()

    if len(pairings) == 0:
        return

    meta_properties = storage.read_meta_properties()

    print_new_line()
    print(f"Pairings list {[p.name for p in pairings]}")

    for band, integration in storage.enumerate_bands_and_integrations():
        print_new_line()
        print(
            f"Pairings loaded for band {band.name}" f", integration {integration.name}"
        )
        timer = Timer((len(meta_properties) ** 2))

        grouped_features = storage.read_grouped_features_all_files(
            band=band,
            integration=integration,
        )

        meta_values = storage.read_grouped_meta_values(band, integration)

        for pairing in pairings:
            for meta_index_a in storage.enumerate_meta_properties():
                for meta_index_b in storage.enumerate_meta_properties():
                    pairing.create_instance(
                        band=band,
                        integration=integration,
                        meta_index_a=meta_index_a,
                        meta_index_b=meta_index_b,
                    )

                    pairing.instance.load(
                        features=grouped_features[:],
                        labels_a=meta_values[meta_index_a],
                        labels_b=meta_values[meta_index_b],
                    )

                    pairing.instance.calculate()
                    storage.write_pairing(pairing)
                    timer.progress()


if __name__ == "__main__":
    env = Env()
    run_pairings(env)
