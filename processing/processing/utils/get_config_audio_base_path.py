import os

from processing.utils.config.get_config import get_config


def get_config_audio_base_path():
    cwd = os.getcwd()
    cfg = get_config()

    audio_base = cfg.variables['audio_base']
    path = os.path.join(cwd, audio_base)

    return path
