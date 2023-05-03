from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.pairings.ClusterPairing import ClusterPairing
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_pairings(env: Env):
    storage = Storage(path=env.storage)

    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()
    meta_properties = storage.read_meta_properties()

    pairings = [
        ["Cluster", ClusterPairing],
    ]

    storage.delete_pairings()

    print_new_line()
    print(f"Pairings loading: {[p[0] for p in pairings]}")

    timer = Timer(
        len(bands) * len(integrations) * len(pairings) * (len(meta_properties) ** 2)
    )

    for band in bands:
        for integration in integrations:
            grouped_features = storage.read_grouped_features_all_files(
                band=band,
                integration=integration,
                unwrap=True,
            )

            meta_values = storage.read_meta_values(band, integration)

            for pairing_index, p in enumerate(pairings):
                # pairing_name = p[0]
                pairing_class = p[1]

                for m_a in storage.enumerate_meta_properties():
                    # meta_property_a = meta_properties[m_a]
                    meta_values_a = meta_values[m_a]

                    for m_b in storage.enumerate_meta_properties():
                        # meta_property_b = meta_properties[m_b]
                        meta_values_b = meta_values[m_b]

                        pairing = pairing_class(
                            band=band,
                            integration=integration,
                            features=grouped_features,
                            pairing_index=pairing_index,
                            meta_index_a=m_a,
                            meta_index_b=m_b,
                            labels_a=meta_values_a,
                            labels_b=meta_values_b,
                        )

                        pairing.calculate()
                        pairing.store(storage)
                        timer.progress()


if __name__ == "__main__":
    env = Env()
    run_pairings(env)
