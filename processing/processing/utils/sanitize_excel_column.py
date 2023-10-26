from typing import Any, List


def validate_excel_names(names: List[str | Any]) -> List[str]:
    names = [str(n) for n in names]
    assert len(names) == len(set(names)), "Names must be unique"
    return names
