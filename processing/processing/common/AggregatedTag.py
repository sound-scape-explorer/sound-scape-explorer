from typing import NamedTuple


class AggregatedTag(NamedTuple):
    i: int  # index
    name: str
    values: list[str]  # flattened, index is aggregated index
    uniques_sorted: list[str]  # by alphanumerical order
    uniques_occurrence: list[str]  # by order of occurrence
