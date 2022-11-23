import json


def get_app_version():
    with open('../package.json', "r") as f:
        file = json.load(f)
        return file['version']
