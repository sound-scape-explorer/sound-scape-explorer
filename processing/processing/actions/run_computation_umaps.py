from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.reducers.UmapReducer import UmapReducer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_computation_umaps(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_computation_umaps()

    computation_umap_dimensions = storage.read_computation_umap_dimensions()
    computation_umap_iterations = storage.read_computation_umap_iterations()

    print_new_line()
    print("Computation UMAPs requested")

    for band, integration in storage.enumerate_bands_and_integrations():
        print_new_line()
        print(
            f"Computation UMAPs loaded with iterations {computation_umap_iterations}"
            f", dimensions {computation_umap_dimensions}"
            f", band {band.name}"
            f", integration {integration.name}"
        )

        timer = Timer(computation_umap_iterations)

        grouped_features = storage.read_grouped_features(
            band=band,
            integration=integration,
        )

        for computation_index in range(computation_umap_iterations):
            umap = UmapReducer(min_dist=0)
            umap.load(
                dimensions=computation_umap_dimensions,
                seed=None,
                features=grouped_features[:],
            )

            reduced_features = umap.calculate()

            storage.write_computation_umap(
                band=band,
                integration=integration,
                computation_index=computation_index,
                features=reduced_features,
            )

            timer.progress()


if __name__ == "__main__":
    env = Env()
    run_computation_umaps(env)
