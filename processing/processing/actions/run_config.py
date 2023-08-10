from rich import print

from processing.common.Env import Env
from processing.config.Config import Config
from processing.prompts.prompt_on_end import prompt_on_end
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

    print("Configuration refreshed :rocket:")

    prompt_on_end()


if __name__ == "__main__":
    env = Env()
    run_config(env)
