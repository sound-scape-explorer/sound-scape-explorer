from datetime import datetime
from typing import Any, Dict, List, Optional

from processing.deprecated_classes.Excel import Excel
from processing.deprecated_errors.ExcelColumnDuplicateColumnError import \
    ExcelColumnDuplicateColumnError
from processing.deprecated_errors.ExcelColumnNotFoundError import \
    ExcelColumnNotFoundError
from processing.deprecated_utils.convert_dict_to_named_tuple import \
    convert_dict_to_named_tuple


class ExcelColumn:
    """The ExcelColumn responsible for digesting `pandas` Excel object and
    extracting cell content.

    Attributes:
        __excel: The `pandas` Excel object.

        __key: The actual content cell referenced as `key`.
            Also used as "prefix".

        values: The list of combined strings with shape of `yield_type:type`.
            Example: `bands:L` for `umaps` `__key`

        __yield_type: The yield type. Acting as key for `__types`.
            TODO: Can be reduced in complexity with `__types`.

        __has_no_prefix: Whether `values` have prefixes or not.

        __allow_duplicate: The caller wants to allow duplicate columns.

        __all_sites: The generated list of all sites if user leaves cell empty.

        __types: The list containing strings or objects used to convert raw
            data by "digest" methods.
            TODO: Can be reduced in complexity with `__yield_type`.

        __payload: The object containing already yielded content.
            TODO: Can be reduced in size.
    """
    __excel: Excel
    __key: str
    values: Optional[List[str]]
    __yield_type: Optional[str]
    __has_no_prefix: bool
    __allow_duplicate: bool
    __all_sites: Optional[List[str]]
    __types: List[Any]
    __payload: Dict[Any, Any]

    def __init__(
        self,
        excel: Excel,
        key: str,
        values: Optional[List[str]] = None,
        yield_type: Optional[str] = None,
        has_no_prefix: Optional[bool] = False,
        allow_duplicate: Optional[bool] = False,
        all_sites: Optional[List[str]] = None,
    ) -> None:
        self.__excel = excel
        self.__key = key
        self.values = values
        self.__yield_type = yield_type
        self.__has_no_prefix = has_no_prefix
        self.__allow_duplicate = allow_duplicate
        self.__all_sites = all_sites if all_sites is not None else []

        self.__types = []
        self.__payload = {}

        self.__prepare_values()
        self.__prepare_types()
        self.__split_values_and_types()

        self.__verify_column()

        self.__iterate()

    @property
    def __is_simple_process(self) -> bool:
        if len(self.values) == 1:
            return True

        return False

    def __prepare_values(self):
        if self.values is None:
            self.values = ['']

        if not self.__has_no_prefix:
            self.values = [f'{self.__key}_{value}' for value in self.values]

    def __digest_config_meta(self, _name, item):
        try:
            if type(item) is not str:
                item = str(int(float(item)))

            return [item]
        except ValueError:
            return [None]

    def __digest_config_sites(self, sites):
        string = str(sites)

        if string == 'nan':
            return self.__all_sites

        return string.split(',')

    def __digest_config_meta_property(self, action_string):
        if '_' in action_string:
            return action_string.split(':')[0].split('_')[1]

        return action_string

    def __digest_config_list(self, my_list):
        if str(my_list) == 'nan':
            return ''

        return my_list.split(',')

    def __digest_config_dates(self, date):
        try:
            return datetime.strptime(date, '%Y%m%d_%H%M')
        except ValueError:
            return datetime.strptime(date, '%Y%m%d_%H%M%S')

    def __prepare_types(self):
        for value in self.values:
            if ':' not in value:
                self.__types.append(str)
                continue

            t = value.split(':')[1]

            self.__types.append(
                {
                    'I': int,
                    'D': self.__digest_config_dates,
                    'L': self.__digest_config_list,
                    'SITES': self.__digest_config_sites,
                    'L-': lambda v: v.split('-'),
                    'L-D': lambda v: [
                        datetime.strptime(vv, '%Y%m%d_%H%M') for vv in
                        v.split('-')
                    ],
                    'COLUMN': lambda el, v=value: self.__digest_config_meta(
                        self.__digest_config_meta_property(v),
                        el,
                    )
                }[t]
            )

    def __split_values_and_types(self):
        self.values = [value.split(':')[0] for value in self.values]

    def __verify_column(self):
        for c in [self.__key] + self.values:
            if c not in self.__excel.table:
                print(self.__excel.table.columns)
                raise ExcelColumnNotFoundError(
                    f'In {self.__excel.path}, need a column named "{c}"'
                )

    def verify_duplicate_column(self, name):
        if name in self.__payload and not self.__allow_duplicate:
            raise ExcelColumnDuplicateColumnError(
                f'In {self.__excel.path}: column "{self.__key}" contains '
                f'"{name}" twice.'
            )

    def __iterate(self):
        for i in range(len(self.__excel.table[self.__key])):
            if type(self.__excel.table[self.__key][i]) != str:
                continue

            name = self.__excel.table[self.__key][i]

            self.verify_duplicate_column(name)

            if self.__is_simple_process:
                value = [
                    self.__types[ic](self.__excel.table[c][i])
                    for ic, c in enumerate(self.values)
                ]

                self.__payload[name] = value

                yield name, value[0]

                continue

            start = 0 if self.__has_no_prefix else len(self.__key) + 1

            value = convert_dict_to_named_tuple(
                {
                    c[start:]: self.__types[ic](self.__excel.table[c][i])
                    for ic, c in enumerate(self.values)
                },
                self.__yield_type,
            )

            self.__payload[name] = value

            yield name, value

    def get_dict(self) -> Dict:
        return dict(self.__iterate())