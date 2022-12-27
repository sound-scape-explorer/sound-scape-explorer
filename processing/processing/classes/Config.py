import pathlib
from json import dumps

from processing.classes.Excel import Excel
from processing.classes.ExcelColumn import ExcelColumn
from processing.classes.ExcelOpen import ExcelOpen
from processing.errors.ConfigInvalidMetaTitlesError import \
    ConfigInvalidMetaTitlesError
from processing.utils.convert_dict_to_named_tuple import \
    convert_dict_to_named_tuple
from processing.utils.get_app_version import get_app_version
from processing.utils.get_columns_from_disk import get_columns_from_disk
from processing.utils.singleton_meta import SingletonMeta


class Config(metaclass=SingletonMeta):
    def __init__(self, path: str = 'config.xlsx', sheet: int = 0):
        self.__excel = Excel(path, sheet)
        self.__excel_open = ExcelOpen(path)

        self.__fetch_variables()
        self.__fetch_meta_titles()
        self.__fetch_files_and_columns_and_all_sites()
        self.__fetch_bands()
        self.__fetch_umaps()
        self.__fetch_ranges()
        self.__fetch_string_map()
        self.__fetch_path()
        self.__fetch_app_version()

    def __fetch_variables(self):
        self.variables = ExcelColumn(self.__excel, 'variables').get_dict()

    def __fetch_meta_titles(self):
        self.meta_titles = self.__excel_open.columns

    def __fetch_files_and_columns_and_all_sites(self):
        _all_columns, unique_columns, columns_length = get_columns_from_disk(
            self.variables['audio_base']
        )

        selectors = ['site', 'start:D', 'tags:L']

        if len(self.meta_titles) != columns_length:
            raise ConfigInvalidMetaTitlesError(
                "Invalid meta titles. Please fill the configuration file"
                )

        for i in range(columns_length):
            selectors.append(f'{self.meta_titles[i]}:COLUMN')

        self.files = ExcelColumn(
            self.__excel,
            'files',
            selectors,
            'FILE',
        ).get_dict()

        self.__set_all_sites()

        self.columns = unique_columns

    def __fetch_bands(self):
        self.bands = ExcelColumn(self.__excel, 'bands').get_dict()

    def __fetch_umaps(self):
        self.UMAPs = ExcelColumn(
            self.__excel,
            'umaps',
            ['integration:I', 'bands:L', 'sites:SITES', 'ranges:L'],
            'UMAP',
        ).get_dict()

    def __fetch_ranges(self):
        self.ranges = ExcelColumn(
            self.__excel,
            'ranges',
            [':L-D'],
        ).get_dict()

    def __fetch_string_map(self):
        self.string_map = ExcelColumn(
            self.__excel,
            'stringmap',
            ['to', 'color'],
            'STRINGMAP',
        ).get_dict()

    def __fetch_path(self):
        self.path = str(pathlib.Path(self.__excel.path).absolute())

    def __fetch_app_version(self):
        self.app_version = get_app_version()

    def __set_all_sites(self):
        self.__all_sites = []

        for f in self.files:
            my_file = self.files[f]
            site = my_file[0]

            if site not in self.__all_sites:
                self.__all_sites.append(site)

    def get_all_sites(self):
        return self.__all_sites

    def __get_payload(self):
        return {
            'variables': self.variables,
            'bands': self.bands,
            'files': self.files,
            'columns': self.columns,
            'columns_names': self.meta_titles,
            'umaps': self.UMAPs,
            'ranges': self.ranges,
            'stringmap': self.string_map,
            'path': self.path,
            'app_version': self.app_version,
        }

    def get(self):
        return convert_dict_to_named_tuple(
            self.__get_payload(),
            'CFG',
        )

    def print_json(self):
        print(
            dumps(
                self.__get_payload(), default=lambda o: o.isoformat(),
            )
        )
