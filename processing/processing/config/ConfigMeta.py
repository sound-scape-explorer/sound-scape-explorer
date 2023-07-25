from typing import List, Set, Tuple

from processing.config.ExcelFile import ExcelFile
from processing.utils.reverse_array import reverse_array


class ConfigMeta:
    index: int
    property: str
    values: List[str]
    """Meta value by file index."""
    set: Set[str]

    def __init__(
        self,
        index: int,
        string: str,
    ) -> None:
        self.index = index
        self.property = self.__digest_string(string)

    @staticmethod
    def is_meta_property(string: str) -> bool:
        prefix = ExcelFile.meta_prefix.value
        prefix_length = len(prefix)
        string_slice = string[:prefix_length]

        if prefix == string_slice:
            return True

        return False

    @staticmethod
    def convert_to_values_by_file(
        metas: List["ConfigMeta"],
    ) -> List[List[str]]:
        meta_values = [m.values for m in metas]
        return reverse_array(meta_values)

    @staticmethod
    def flatten(
        metas: List["ConfigMeta"],
    ) -> Tuple[List[str], List[List[str]]]:
        properties = [str.upper(m.property) for m in metas]
        sets = [list(m.set) for m in metas]

        return properties, sets

    def __validate_excel_string(
        self,
        string: str,
    ) -> None:
        if not self.is_meta_property(string):
            raise KeyError(f"Unable to find meta prefix in string {string}.")

    def __digest_string(
        self,
        string: str,
    ) -> str:
        self.__validate_excel_string(string)
        return string.replace(ExcelFile.meta_prefix.value, "")

    def load_values(
        self,
        array: List,
    ) -> List[str]:
        self.values = [str(value) for value in array]
        self.set = set(self.values)
        return self.values

    def get_value(
        self,
        file_index: int,
    ) -> str:
        return self.values[file_index]
