from datetime import datetime
from typing import Any, Dict, List, Optional

from processing.classes.Excel import Excel
from processing.errors.ExcelColumnDuplicateColumnError import \
    ExcelColumnDuplicateColumnError
from processing.errors.ExcelColumnNotFoundError import ExcelColumnNotFoundError
from processing.utils.digest_config_columns import digest_config_columns
from processing.utils.digest_config_sites import digest_config_sites
from processing.utils.extract_name_from_digest_action import \
    extract_name_from_digest_action
from processing.utils.namedtuple_dic import namedtuple_dic


class ExcelColumn:
    __allow_duplicate: bool
    __excel: Excel
    __has_no_prefix: bool
    __key: str
    __payload: Dict[Any, Any]
    __types: List[Any]
    values: Optional[List[str]]
    __yield_type: Optional[str]

    def __init__(
            self,
            excel: Excel,
            key: str,
            values: Optional[List[str]] = None,
            yield_type: Optional[str] = None,
            has_no_prefix: bool = False,
            allow_duplicate: bool = False,
    ):
        self.__excel = excel
        self.__key = key
        self.values = values
        self.__yield_type = yield_type
        self.__has_no_prefix = has_no_prefix
        self.__allow_duplicate = allow_duplicate

        self.__types = []
        self.__payload = {}

        self.__prepare_values()
        self.__prepare_types()
        self.__split_values_and_types()

        self.__verify_column()

        self.__process()

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

    def __prepare_types(self):
        for value in self.values:
            if ':' not in value:
                self.__types.append(str)
                continue

            t = value.split(':')[1]

            self.__types.append(
                {
                    'I': int,
                    'D': lambda v: datetime.strptime(v, '%Y%m%d_%H%M'),
                    'L': lambda v: v.split(','),
                    'SITES': digest_config_sites,
                    'L-': lambda v: v.split('-'),
                    'L-D': lambda v: [
                        datetime.strptime(vv, '%Y%m%d_%H%M') for vv in
                        v.split('-')
                    ],
                    'COLUMN': lambda el: digest_config_columns(
                        extract_name_from_digest_action(value),
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

    def __process(self):
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

            value = namedtuple_dic(
                {
                    c[start:]: self.__types[ic](self.__excel.table[c][i])
                    for ic, c in enumerate(self.values)
                },
                self.__yield_type,
            )

            self.__payload[name] = value

            yield name, value

    def get_dict(self):
        return dict(self.__process())
