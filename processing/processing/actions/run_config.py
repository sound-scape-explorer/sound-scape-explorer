from processing.common.Env import Env
from processing.config.Config import Config
from processing.storage.Storage import Storage


def run_config(env: Env):
    config = Config(path=env.config)
    storage = Storage(path=env.storage)

    storage.delete_config()

    config.store(storage)


if __name__ == "__main__":
    env = Env()
    run_config(env)