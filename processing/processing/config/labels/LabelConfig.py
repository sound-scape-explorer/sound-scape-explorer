from typing import List, Tuple

from processing.config.files.FileSheet import FileSheet
from processing.utils.get_uniques_sorted import get_uniques_sorted
from processing.utils.get_uniques_unsorted import get_uniques_unsorted
from processing.utils.reverse_array import reverse_array


class LabelConfig:
    index: int
    property: str
    values: List[str]  # label values by file index
    uniques_sorted: List[str]  # by alphanumerical order
    uniques_unsorted: List[str]  # by order of occurrence

    def __init__(
        self,
        index: int,
        property: str,
    ) -> None:
        self.index = index
        self.property = property

    @staticmethod
    def is_label_property(string: str) -> bool:
        prefix = FileSheet.label_prefix.value
        prefix_length = len(prefix)
        string_slice = string[:prefix_length]

        if prefix == string_slice:
            return True

        return False

    @staticmethod
    def convert_to_values_by_file(
        metas: List["LabelConfig"],
    ) -> List[List[str]]:
        meta_values = [m.values for m in metas]
        return reverse_array(meta_values)

    @staticmethod
    def flatten(
        metas: List["LabelConfig"],
    ) -> Tuple[List[str], List[List[str]]]:
        properties = [str.upper(m.property) for m in metas]
        sets = [list(m.uniques_sorted) for m in metas]

        return properties, sets

    @staticmethod
    def trim_prefixed_property_from_config(string: str) -> str:
        assert LabelConfig.is_label_property(
            string
        ), f"Unable to find label prefix in string {string}."

        return string.replace(FileSheet.label_prefix.value, "")

    def load_values(
        self,
        array: List,
    ) -> List[str]:
        self.values = [str(value) for value in array]
        self.uniques_sorted = get_uniques_sorted(self.values)
        self.uniques_unsorted = get_uniques_unsorted(self.values)
        return self.values

    def get_value(
        self,
        file_index: int,
    ) -> str:
        return self.values[file_index]
