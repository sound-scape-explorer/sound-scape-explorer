from processing.common.Env import Env
from processing.matrices.MeanDistancesMatrix import MeanDistancesMatrix
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_mean_distances_matrix(env: Env):
    storage = Storage(path=env.storage)

    storage.delete_mean_distances_matrix()

    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()

    print_new_line()
    print("Mean distances matrix requested")

    for band in bands:
        for integration in integrations:
            print(
                f"Mean distances matrix loaded for band {band}"
                f", integration {integration}"
            )

            computation_umaps = storage.read_computation_umaps(
                band=band, integration=integration
            )

            mean_distances_matrix = MeanDistancesMatrix(
                umaps=computation_umaps,
            )

            matrix = mean_distances_matrix.calculate()

            storage.write_mean_distances_matrix(
                band=band,
                integration=integration,
                matrix=matrix,
            )


if __name__ == "__main__":
    env = Env()
    run_mean_distances_matrix(env)
