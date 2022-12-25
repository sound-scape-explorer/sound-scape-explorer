import os

from processing.classes.Config import Config


def get_config_audio_base_path():
    cwd = os.getcwd()
    cfg = Config().get()

    audio_base = cfg.variables['audio_base']
    path = os.path.join(cwd, audio_base)

    return path
