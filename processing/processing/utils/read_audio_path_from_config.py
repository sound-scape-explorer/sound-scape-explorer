import os

from processing.config.ConfigParser import ConfigParser
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.utils.get_absolute_path import get_absolute_path


def read_audio_path_from_config(config_path: str) -> str:
    folder_path = os.path.dirname(config_path)
    parser = ConfigParser(config_path, folder_path)
    settings = SettingsStorage.read_from_config(parser)
    return get_absolute_path(settings.audio_path)
