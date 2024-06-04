from typing import List, Any


def is_mdm_empty(mdm: List[Any]) -> bool:
    return len(mdm) == 1 and len(mdm[0]) == 0
