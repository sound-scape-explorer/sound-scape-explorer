from processing.types import Mdm


def is_mdm_empty(mdm: Mdm) -> bool:
    return mdm.shape[0] == 1 and mdm.shape[1] == 0
