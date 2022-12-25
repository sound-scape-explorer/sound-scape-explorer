import json


class App:
    @staticmethod
    def get_version() -> str:
        with open('../package.json', "r") as f:
            my_file = json.load(f)
            return my_file['version']
