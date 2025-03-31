from enum import Enum


class StorageMode(Enum):
    readonly = "r"
    rw_or_fail = "r+"
    rw_or_create = "a"
    create_or_fail = "x"
    create_or_overwrite = "w"
