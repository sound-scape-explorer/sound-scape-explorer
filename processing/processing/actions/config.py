from processing.config.Config import Config
from processing.storage.Storage import Storage

config = Config(path='./sample/config.xlsx')
storage = Storage(path='./sample/sse.h5')
storage.delete_config()
config.store(storage)
