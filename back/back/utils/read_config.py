from typing import Dict

from back.constants import BASE_PATH
from back.utils.read_json_file import read_json_file


def read_config() -> Dict[str, any]:
    path = f'{BASE_PATH}/generated/ghost-config.json'
    return read_json_file(path)
