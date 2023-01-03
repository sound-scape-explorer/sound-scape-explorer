import os
from datetime import datetime

from processing.classes.Config import Config
from processing.utils.read_meta_values_from_filepath import \
    read_meta_values_from_filepath


class Filepaths:
    def __init__(self):
        self.__config = Config()
        self.__directories = []
        self.__filepaths = []
        self.__times = []
        self.__meta_values = []

        self.__discover()

    @property
    def __path(self):
        cwd = os.getcwd()
        audio_base = self.__config.get().variables['audio_base']
        path = os.path.join(cwd, audio_base)

        return path

    def __read_meta_values_from_filepath(self, filepath):
        parts = filepath.split('/')

        filename_with_extension = parts[len(parts) - 1]
        filename_with_extension_parts = filename_with_extension.split('.')

        [filename, _extension] = filename_with_extension_parts

        meta_values = filename.split('_')

        return meta_values

    def __discover(self):
        for root, dirs, files in os.walk(self.__path, topdown=True):
            for f in sorted(files):
                path = os.path.join(root, f)
                self.__filepaths.append(path)
                self.__times.append(os.path.getmtime(path))
                self.__meta_values.append(read_meta_values_from_filepath(path))
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

    def get_times(self):
        return self.__times

    def get_times_as_dates(self):
        dates = []

        for time in self.__times:
            date = datetime.fromtimestamp(time)
            formatted_date = date.strftime('%Y%m%d_%H%M')
            dates.append(formatted_date)

        return dates

    def get_meta_values(self):
        return self.__meta_values
