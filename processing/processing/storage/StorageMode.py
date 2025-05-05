from enum import Enum


class StorageMode(Enum):
    READONLY = "r"
    RW_OR_FAIL = "r+"
    RW_OR_CREATE = "a"
    CREATE_OR_FAIL = "x"
    CREATE_OR_OVERWRITE = "w"
