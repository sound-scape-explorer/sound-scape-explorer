from typing import NamedTuple


class FusedLabel(NamedTuple):
    index: int
    property: str
    values: list[str]
    uniques_sorted: list[str]  # by alphanumerical order
    uniques_unsorted: list[str]  # by order of occurrence
