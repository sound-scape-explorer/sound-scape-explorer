from processing.common.Env import Env
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_trajectories(env: Env):
    storage = Storage(path=env.storage)

    print_new_line()
    print("Trajectories loaded")


if __name__ == "__main__":
    env = Env()
    run_trajectories(env)
