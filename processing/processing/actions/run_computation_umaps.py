from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.reducers.UmapReducer import UmapReducer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_computation_umaps(env: Env):
    storage = Storage(path=env.storage)

    storage.delete_computation_umaps()

    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()

    computation_umap_dimensions = storage.read_computation_umap_dimensions()
    computation_umap_iterations = storage.read_computation_umap_iterations()

    timer = Timer(len(bands) * len(integrations) * computation_umap_iterations)

    print_new_line()
    print(
        f"Computation UMAPs requested with iterations {computation_umap_iterations},"
        f" dimensions {computation_umap_dimensions}"
    )

    for band, integration in storage.enumerate_bands_and_integrations():
        grouped_features = storage.read_grouped_features(
            band=band, integration=integration
        )

        for computation_index in range(computation_umap_iterations):
            umap = UmapReducer(
                target_dimensions=computation_umap_dimensions,
                seed=None,
                min_dist=0,
            )

            reduced_features = umap.reduce(features=grouped_features[:])

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
