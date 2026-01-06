from processing.config.Config import Config
from processing.storage.Storage import Storage


class Context:
    config: Config
    storage: Storage
    last_choice: str | None

    def __init__(self, config_path: str):
        self.config = Config(config_path)
        self.storage = Storage(self.config.settings.storage_path)
        self.last_choice = None
