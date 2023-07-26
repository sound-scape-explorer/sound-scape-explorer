from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.matrices.MeanDistancesMatrix import MeanDistancesMatrix
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_mean_distances_matrix(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_mean_distances_matrix()

    print_new_line()
    print("Mean distances matrix requested")

    for band, integration in storage.enumerate_bands_and_integrations():
        print_new_line()
        print(
            f"Mean distances matrix loaded for band {band.name}"
            f", integration {integration.name}"
        )
        timer = Timer(1)

        computation_umaps = storage.read_computation_umaps(
            band=band, integration=integration
        )

        mean_distances_matrix = MeanDistancesMatrix()

        matrix = mean_distances_matrix.calculate(features=computation_umaps)

        storage.write_mean_distances_matrix(
            band=band,
            integration=integration,
            matrix=matrix,
        )

        timer.progress()


if __name__ == "__main__":
    env = Env()
    run_mean_distances_matrix(env)
