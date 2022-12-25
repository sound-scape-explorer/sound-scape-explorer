import pathlib


class AudioFiles:
    def __init__(self, config, *more):
        self.__config = config
        self.__more = more

        self.__parse_config()

    def __parse_config(self):
        self.files = self.__config.files
        self.suffix = self.__config['audio_suffix']
        self.base_path = self.__config['audio_base']

    def __get_filename_path(self, filename):
        return pathlib.Path(self.base_path).joinpath(filename + self.suffix)

    def iterate(self):
        pass
