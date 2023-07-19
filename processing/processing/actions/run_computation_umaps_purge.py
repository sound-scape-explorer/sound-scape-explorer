from processing.common.Env import Env
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_computation_umaps_purge(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_computation_umaps()

    print_new_line()
    print("Computation UMAPs purged")


if __name__ == "__main__":
    env = Env()
    run_computation_umaps_purge(env)
