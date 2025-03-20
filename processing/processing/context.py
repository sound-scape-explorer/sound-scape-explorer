from typing import Union

from processing.common.MenuChoice import MenuChoice
from processing.new.ConfigNew import ConfigNew
from processing.new.StorageNew import StorageNew


class Context:
    config: ConfigNew
    storage: StorageNew
    last_choice: Union[MenuChoice, None]

    def __init__(self, config_path: str):
        self.config = ConfigNew(config_path)
        self.storage = StorageNew(self.config.settings.storage_path)
        self.last_choice = None
