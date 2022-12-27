import os

from processing.classes.Config import Config


class Filepaths:
    def __init__(self):
        self.__config = Config()
        self.__directories = []
        self.__filepaths = []

        self.__discover()

    @property
    def __path(self):
        cwd = os.getcwd()
        audio_base = self.__config.get().variables['audio_base']
        path = os.path.join(cwd, audio_base)

        return path

    def __discover(self):
        for root, dirs, files in os.walk(self.__path, topdown=True):
            for f in sorted(files):
                self.__filepaths.append(os.path.join(root, f))
            for d in sorted(dirs):
                self.__directories.append(os.path.join(root, d))

    def get_values(self):
        return self.__filepaths

    def get_filenames(self):
        filenames = []

        for file in self.__filepaths:
            filename = file.split(self.__path)[1]
            filenames.append(filename)

        return filenames
