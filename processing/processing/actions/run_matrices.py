from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_matrices(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_matrices()

    matrices = storage.read_config_matrices()

    if len(matrices) == 0:
        return

    bands = storage.read_config_bands()
    integrations = storage.read_config_integrations()
    meta_properties = storage.read_meta_properties()

    print_new_line()
    print(f"Matrices list {[m for m in matrices]}")

    timer = Timer(len(bands) * len(integrations) * len(matrices) * len(meta_properties))

    for band, integration in storage.enumerate_bands_and_integrations():
        print(
            f"Matrices loaded for band {band.name}"
            f", integration {integration.duration}"
        )

        grouped_features = storage.read_grouped_features_all_files(
            band=band,
            integration=integration,
        )

        meta_values = storage.read_grouped_meta_values(band, integration)

        for matrix in matrices:
            for meta_index in storage.enumerate_meta_properties():
                matrix.create_instance(
                    band=band,
                    integration=integration,
                    meta_index=meta_index,
                )

                matrix.instance.load(
                    features=grouped_features,
                    labels=meta_values[meta_index],
                )
                matrix.instance.calculate()
                storage.write_matrix(matrix=matrix)
                timer.progress()


if __name__ == "__main__":
    env = Env()
    run_matrices(env)
