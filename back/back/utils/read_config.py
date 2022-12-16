from back.constants import BASEPATH
from back.utils.read_json_file import read_json_file


def read_config():
    path = f'{BASEPATH}/generated/ghost-config.json'
    return read_json_file(path)
