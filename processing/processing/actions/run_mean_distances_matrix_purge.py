from processing.common.Env import Env
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_mean_distances_matrix_purge(env: Env):
    storage = Storage(path=env.storage)

    print_new_line()
    print("Mean distances matrix purge requested")

    storage.delete_mean_distances_matrix()


if __name__ == "__main__":
    env = Env()
    run_mean_distances_matrix_purge(env)
