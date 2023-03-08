from processing.common.Env import Env
from processing.config.Config import Config
from processing.storage.Storage import Storage

env = Env()
config = Config(path=env.config)
storage = Storage(path=env.storage)

storage.delete_config()

config.store(storage)
