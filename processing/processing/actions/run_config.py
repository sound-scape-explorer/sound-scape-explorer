from processing.common.Env import Env
from processing.config.Config import Config
from processing.config.sites.SiteStorage import SiteStorage
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_config(env: Env):
    storage = Storage(path=env.storage)
    config = Config(path=env.config)
    config.write(storage)

    print_new_line()
    print("File indexes by site")
    sites = SiteStorage.read_from_storage(storage, config.settings)
    for site in sites:
        print(site.name, [f.index for f in site.files])


if __name__ == "__main__":
    env = Env()
    run_config(env)
