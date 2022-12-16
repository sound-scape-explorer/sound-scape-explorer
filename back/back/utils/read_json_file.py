import json


def read_json_file(path):
    with open(path, "r") as f:
        content = json.load(f)
        return content
