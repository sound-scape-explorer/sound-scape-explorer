from typing import NamedTuple


# todo: to remove
class AggregatedTag(NamedTuple):
    i: int  # index
    name: str
    values: list[str]  # flattened, index is aggregation index
    uniques_sorted: list[str]  # by alphanumerical order
    uniques_occurrence: list[str]  # by order of occurrence
