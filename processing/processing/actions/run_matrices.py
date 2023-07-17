from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.matrices.Matrix import Matrix
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_matrices(env: Env):
    storage = Storage(path=env.storage)

    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()
    meta_properties = storage.read_meta_properties()
    matrices = storage.read_matrices()

    storage.delete_matrices()

    print_new_line()
    print(f"Matrices list {[m for m in matrices]}")

    timer = Timer(len(bands) * len(integrations) * len(matrices) * len(meta_properties))

    for band, integration in storage.enumerate_bands_and_integrations():
        print(f"Matrices loaded for band {band}, integration {integration}")

        grouped_features = storage.read_grouped_features_all_files(
            band=band,
            integration=integration,
        )

        meta_values = storage.read_meta_values(band, integration)

        for m, matrix_name in enumerate(matrices):
            for meta_index in storage.enumerate_meta_properties():
                meta_property_values = meta_values[meta_index]

                matrix = Matrix(
                    name=matrix_name,
                    band=band,
                    integration=integration,
                    matrix_index=m,
                    meta_index=meta_index,
                    features=grouped_features[:],
                    labels=meta_property_values,
                )

                if matrix is None:
                    continue

                matrix.calculate()
                matrix.store(storage)
                timer.progress()


if __name__ == "__main__":
    env = Env()
    run_matrices(env)
