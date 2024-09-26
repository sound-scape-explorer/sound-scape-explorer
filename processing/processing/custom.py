from processing.actions.digest import digest
from processing.config.files.FileStorage import FileStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.storage.Storage import Storage

storage_path = "/home/bamdad/Downloads/AXA_SSE.h5"
storage = Storage(storage_path)

settings = SettingsStorage.read_from_storage(storage)
files = FileStorage.read_from_storage(storage, settings)
digest(storage)

storage.close()
