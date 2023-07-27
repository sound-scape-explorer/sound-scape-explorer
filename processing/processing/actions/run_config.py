from processing.common.Env import Env
from processing.config.Config import Config
from processing.storage.Storage import Storage


def run_config(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_config()

    config = Config(path=env.config)
    config.store(storage)

    storage.write_sites(config.sites)


if __name__ == "__main__":
    env = Env()
    run_config(env)
