import subprocess

from processing.common.Env import Env
from processing.config.Config import Config
from processing.storage.Storage import Storage
from processing.utils.print_extractors import print_extractors
from processing.utils.print_file_indexes_by_site import print_file_indexes_by_site


def run_config(env: Env):
    storage = Storage(path=env.storage)
    config = Config(path=env.config)
    config.write(storage)

    print_file_indexes_by_site(storage, config.settings)
    print_extractors(storage)

    storage.close()

    subprocess.run(["python3", "processing/cli.py"])


if __name__ == "__main__":
    env = Env()
    run_config(env)
