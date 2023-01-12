import json


def read_version_from_package() -> str:
    with open('../package.json', "r") as f:
        my_file = json.load(f)
        return my_file['version']
