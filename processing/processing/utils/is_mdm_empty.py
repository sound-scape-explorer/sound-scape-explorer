from processing.types import Mdm


def is_mdm_empty(mdm: Mdm) -> bool:
    return len(mdm) == 1 and len(mdm[0]) == 0
