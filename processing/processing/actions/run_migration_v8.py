from processing.common.Env import Env
from processing.storage.Storage import Storage


def run_migration_v8(env: Env):
    storage = Storage(path=env.storage)
    storage.migrate_v8()


if __name__ == "__main__":
    env = Env()
    run_migration_v8(env)
