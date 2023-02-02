from json import dumps
from typing import Dict, List, Tuple

from processing.classes.Excel import Excel
from processing.classes.ExcelColumn import ExcelColumn
from processing.classes.ExcelOpen import ExcelOpen
from processing.constants import (
    AUDIO_BASE,
    AUDIO_SUFFIX,
    FEATURE_BASE,
    GENERATED_BASE,
    OTHER_BASE,
)
from processing.types.ConfigVariablesInterface import ConfigVariablesInterface
from processing.utils.convert_dict_to_named_tuple import \
    convert_dict_to_named_tuple
from processing.utils.read_version_from_package import read_version_from_package
from processing.utils.singleton_meta import SingletonMeta


class Config(metaclass=SingletonMeta):
    """The user configuration file.

    Attributes:
        __excel: The Excel configuration file inherited from legacy code.
            Used to read only with `pandas` library.

        __excel_open: The Excel configuration file using `openpyxl`.
            Used to cherry-pick cells, append and write to current file.

        variables: The user global settings.

        files: The dictionary of all files referenced in the Excel file.
            Keys are audio files' paths.
            Values are tuples made of:
                - The audio file path.
                - The date and time.
                - The tags.
                - N lists of meta values. TODO: Type this correctly.

        __all_sites: The list of all sites (all files).
            Used if user ignores site configuration.
            TODO: Perfectible. Separate from `Config` concern.

        bands: The dictionary containing frequency ranges in Hz.
            Keys are band names.
            Values are strings separated by `-` describing frequency ranges.

        umaps: The dictionary containing UMAPs.
            Keys are integration names.
            Values are tuples made of:
                - The integration value in seconds.
                - The list of selected frequency range keys.
                - The list of files to process.
                - The list of date and time ranges.

        ranges: The dictionary of date and time ranges.
            Keys are date and time range names.
            Values are lists of 2 strings: beginning and ending dates.

        string_map: The dictionary of string maps.
            TODO: Is this still used?

        app_version: The current application version.

        integrations: The list of integration values.

    TODO:
        Unnecessary data is passed to exported files.
        Do not refactor but rewrite from scratch.
    """
    __excel: Excel
    __excel_open: ExcelOpen
    variables: ConfigVariablesInterface
    files: Dict[str, Tuple[str, str, str, List[str]]]
    __all_sites: List[str]
    bands: Dict[str, str]
    umaps: Dict[str, Tuple[int, List[str], List[str], List[str]]]
    ranges: Dict[str, List[str]]
    string_map: Dict[str, List[str]]
    app_version: str
    integrations: List[int] = []

    def __init__(
        self,
        path: str = 'config.xlsx',
        sheet: int = 0,
    ) -> None:
        self.__excel = Excel(path, sheet)
        self.__excel_open = ExcelOpen(path)

        self.__fetch_variables()
        self.__fetch_files_and_columns_and_all_sites()
        self.__fetch_bands()
        self.__fetch_umaps()
        self.__fetch_ranges()
        self.__fetch_string_map()
        self.__fetch_app_version()
        self.__prepare_integrations()

    def __fetch_variables(self):
        self.variables = ExcelColumn(self.__excel, 'variables').get_dict()
        self.__populate_empty_variables()

    def __populate_empty_variables(self):
        if self.variables['audio_base'] == 'nan':
            self.variables['audio_base'] = AUDIO_BASE

        if self.variables['audio_suffix'] == 'nan':
            self.variables['audio_suffix'] = AUDIO_SUFFIX

        if self.variables['feature_base'] == 'nan':
            self.variables['feature_base'] = FEATURE_BASE

        if self.variables['generated_base'] == 'nan':
            self.variables['generated_base'] = GENERATED_BASE

        if self.variables['other_base'] == 'nan':
            self.variables['other_base'] = OTHER_BASE

        if self.variables['umap_random'] == 'nan':
            self.variables['umap_random'] = None

        if self.variables['display_locale'] == 'nan':
            self.variables['display_locale'] = ''

    def __fetch_files_and_columns_and_all_sites(self):
        # generate selectors
        selectors = ['site', 'start:D', 'tags:L']

        for i in range(len(self.__excel_open.meta_properties)):
            selectors.append(f'{self.__excel_open.meta_properties[i]}:COLUMN')

        # read files column
        self.files = ExcelColumn(
            self.__excel,
            'files',
            selectors,
            'FILE',
        ).get_dict()

        self.__set_all_sites()

    def __fetch_bands(self):
        self.bands = ExcelColumn(self.__excel, 'bands').get_dict()

    def __fetch_umaps(self):
        self.umaps = ExcelColumn(
            self.__excel,
            'umaps',
            ['integration:I', 'bands:L', 'sites:SITES', 'ranges:L'],
            'UMAP',
            None,
            None,
            self.__all_sites,
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

    def __fetch_app_version(self):
        try:
            self.app_version = read_version_from_package()
        except FileNotFoundError:
            self.app_version = '0.0.0'

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
            'meta_properties': self.__excel_open.meta_properties,
            'meta_contents': self.__excel_open.meta_values_uniques,
            'umaps': self.umaps,
            'ranges': self.ranges,
            'stringmap': self.string_map,
            'path': str(self.__excel.get_path_absolute()),
            'app_version': self.app_version,
        }

    def get(self):
        return convert_dict_to_named_tuple(
            self.__get_payload(),
            'CFG',
        )

    def get_columns(self):
        return self.__excel_open.columns

    def get_meta_properties(self):
        return self.__excel_open.meta_properties

    def get_meta_values(self):
        return self.__excel_open.meta_values

    def get_meta_values_uniques(self):
        return self.__excel_open.meta_values_uniques

    def __get_json_string(self):
        return dumps(self.__get_payload(), default=lambda o: o.isoformat())

    def export(self):
        json = self.__get_json_string()
        path = GENERATED_BASE + 'ghost-config.json'
        f = open(path, "w")
        f.write(json)

    def __prepare_integrations(self):
        if self.variables['integration_seconds'] == 'nan':
            for umap in self.umaps.values():
                integration = umap[0]
                self.integrations.append(integration)
        else:
            self.integrations = [
                int(v) for v in
                self.variables['integration_seconds'].split('-')
            ]

        # TODO: Ugly, remove on config rewrite
        self.variables['integration_seconds'] = "-".join(
            str(v) for v in iter(self.integrations)
        )
