import yaml
from yaml.loader import SafeLoader

from processing.common.YamlEnv import YamlEnv
from processing.utils.does_path_exist import does_path_exist


def get_yaml_data(path: str):
    file = open(path)
    data = yaml.load(file, Loader=SafeLoader)
    file.close()

    config = data["config"]
    assert does_path_exist(config) is True, "Config file does not exist."

    storage = data["storage"]
    env = YamlEnv(config=config, storage=storage)

    return env
