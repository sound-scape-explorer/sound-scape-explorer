from processing.common.Env import Env
from processing.config.Config import Config
from processing.storage.Storage import Storage


def run_config(env: Env):
    storage = Storage(path=env.storage)
    config = Config(path=env.config)
    config.write(storage)

    sites = storage.read_config_sites()

    for site in sites:
        print(site.name, [f.index for f in site.files])


if __name__ == "__main__":
    env = Env()
    run_config(env)
