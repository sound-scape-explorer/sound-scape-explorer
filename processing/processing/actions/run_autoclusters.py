from typing import List

from hdbscan import HDBSCAN

from processing.clusterings.ClusteringName import ClusteringName
from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_autoclusters(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_autoclusters()

    config_autoclusters = storage.read_config_autoclusters()

    if len(config_autoclusters) == 0:
        return

    bands = storage.read_config_bands()
    integrations = storage.read_config_integrations()

    print_new_line()
    print(f"Autoclusters list {[ac.name for ac in config_autoclusters]}")

    timer = Timer(len(bands) * len(integrations) * len(config_autoclusters))

    for band, integration in storage.enumerate_bands_and_integrations():
        for config_autocluster in config_autoclusters:
            print(
                f"Autocluster '{config_autocluster.name}' loaded"
                f" for band {band.name}, integration {integration.duration}"
            )

            if config_autocluster.name == ClusteringName.hdbscan_eom.value:
                method = "eom"
            elif config_autocluster.name == ClusteringName.hdbscan_leaf.value:
                method = "leaf"
            else:
                raise KeyError(
                    f"Unable to find clustering name {config_autocluster.name}."
                )

            alpha = float(config_autocluster.alpha)
            epsilon = float(config_autocluster.epsilon)

            clustering = HDBSCAN(
                min_cluster_size=config_autocluster.min_cluster_size,
                min_samples=config_autocluster.min_samples,
                alpha=alpha,
                cluster_selection_epsilon=epsilon,
                cluster_selection_method=method,
                metric="precomputed",
                p=None,
                algorithm="best",
                leaf_size=50,
                approx_min_span_tree=True,
                gen_min_span_tree=False,
                core_dist_n_jobs=-1,
                match_reference_implementation=False,
            )

            mean_distances_matrix = storage.read_mean_distances_matrix(
                band=band,
                integration=integration,
            )

            clustering.fit(mean_distances_matrix[:])

            autocluster: List[int] = clustering.labels_.tolist()

            storage.write_autocluster(
                band=band,
                integration=integration,
                autocluster_index=config_autocluster.index,
                autocluster=autocluster,
            )

            timer.progress()


if __name__ == "__main__":
    env = Env()
    run_autoclusters(env)
