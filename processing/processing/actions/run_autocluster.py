import numpy

from processing.clusterings.AutoConsensusClustering import AutoConsensusClustering
from processing.common.Env import Env
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_autocluster(env: Env):
    storage = Storage(path=env.storage)
    settings = storage.read_settings()

    if not settings["autocluster"]:
        return

    storage.delete_autocluster()

    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()

    for band in bands:
        print_new_line()
        print("AutoCluster loading")

        for integration in integrations:
            grouped_features = storage.read_grouped_features_all_files(
                band=band,
                integration=integration,
            )

            clustering = AutoConsensusClustering(
                features=grouped_features[:],
                iterations=settings["autocluster_iterations"],
                min_cluster_size=settings["autocluster_min_size"],
                max_cluster_size=settings["autocluster_max_size"],
                threshold=settings["autocluster_threshold"],
            )

            consensus = clustering.get_consensus()
            score = clustering.get_score()
            numpy.set_printoptions(threshold=numpy.inf)  # type: ignore

            print("Consensus:")

            for value in list(set(consensus)):
                print(f"  {value}: {consensus.count(value)}")

            print(f"Score: {score}")

            storage.write_autocluster(
                autocluster=consensus,
                band=band,
                integration=integration,
            )


if __name__ == "__main__":
    env = Env()
    run_autocluster(env)
