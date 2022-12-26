import pathlib
from json import dumps

from processing.classes.Excel import Excel
from processing.classes.ExcelColumn import ExcelColumn
from processing.classes.ExcelOpen import ExcelOpen
from processing.utils.convert_dict_to_named_tuple import \
    convert_dict_to_named_tuple
from processing.utils.get_app_version import get_app_version
from processing.utils.get_columns_from_disk import get_columns_from_disk
from processing.utils.list_all_sites import list_all_sites
from processing.utils.singleton_meta import SingletonMeta


class Config(metaclass=SingletonMeta):
    def __init__(self, path: str = 'config.xlsx', sheet: int = 0):
        self.__excel = Excel(path, sheet)
        self.__excel_open = ExcelOpen(path)

        self.__set_variables()
        self.__set_columns_names()
        self.__set_files_and_columns()
        self.__set_bands()
        self.__set_umaps()
        self.__set_ranges()
        self.__set_string_map()
        self.__set_path()
        self.__set_app_version()

    def __set_variables(self):
        self.variables = ExcelColumn(self.__excel, 'variables').get_dict()

    def __set_columns_names(self):
        self.columns_names = self.__excel_open.columns

    def __set_files_and_columns(self):
        unique_columns, _all_columns, columns_length = get_columns_from_disk(
            self.variables['audio_base']
        )

        selectors = ['site', 'start:D', 'tags:L']

        for i in range(columns_length + 1):
            selectors.append(f'{self.columns_names[i]}:COLUMN')

        self.files = ExcelColumn(
            self.__excel,
            'files',
            selectors,
            'FILE',
        ).get_dict()

        list_all_sites(self.files)

        self.columns = unique_columns

    def __set_bands(self):
        self.bands = ExcelColumn(self.__excel, 'bands').get_dict()

    def __set_umaps(self):
        self.UMAPs = ExcelColumn(
            self.__excel,
            'umaps',
            ['integration:I', 'bands:L', 'sites:SITES', 'ranges:L'],
            'UMAP',
        ).get_dict()

    def __set_ranges(self):
        self.ranges = ExcelColumn(
            self.__excel,
            'ranges',
            [':L-D'],
        ).get_dict()

    def __set_string_map(self):
        self.string_map = ExcelColumn(
            self.__excel,
            'stringmap',
            ['to', 'color'],
            'STRINGMAP',
        ).get_dict()

    def __set_path(self):
        self.path = str(pathlib.Path(self.__excel.path).absolute())

    def __set_app_version(self):
        self.app_version = get_app_version()

    @property
    def __payload(self):
        return {
            'variables': self.variables,
            'bands': self.bands,
            'files': self.files,
            'columns': self.columns,
            'columns_names': self.columns_names,
            'umaps': self.UMAPs,
            'ranges': self.ranges,
            'stringmap': self.string_map,
            'path': self.path,
            'app_version': self.app_version,
        }

    def get(self):
        return convert_dict_to_named_tuple(self.__payload, 'CFG')

    def print_json(self):
        print(
            dumps(
                self.__payload, default=lambda o: o.isoformat()
            )
        )
