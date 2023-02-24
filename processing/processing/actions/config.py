from processing.config.Config import Config
from processing.storage.Storage import Storage

storage = Storage(path='./sample/sse.h5')

config = Config(
    path='./sample/config.xlsx',
    storage=storage,
)

storage.delete_configuration()

config.store()
