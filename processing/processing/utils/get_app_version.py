import json


def get_app_version():
    with open('../package.json', "r") as f:
        my_file = json.load(f)
        return my_file['version']
