from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_autoclusters(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_autoclusters()

    autoclusters = storage.read_config_autoclusters()

    if len(autoclusters) == 0:
        return

    bands = storage.read_config_bands()
    integrations = storage.read_config_integrations()

    print_new_line()

    print(
        f"Autoclusters requested {[ac.name for ac in autoclusters]} with"
        f", bands {[b.name for b in bands]}"
        f", integrations {[i.name for i in integrations]}"
    )

    timer = Timer(len(bands) * len(integrations) * len(autoclusters))

    for band, integration in storage.enumerate_bands_and_integrations():
        for autocluster in autoclusters:
            autocluster.create_instance(
                band=band,
                integration=integration,
            )

            mean_distances_matrix = storage.read_mean_distances_matrix(
                band=band,
                integration=integration,
            )

            autocluster.calculate(mean_distances_matrix[:])

            storage.write_autocluster(
                band=band,
                integration=integration,
                autocluster_index=autocluster.index,
                values=autocluster.values,
            )

            timer.progress()


if __name__ == "__main__":
    env = Env()
    run_autoclusters(env)
