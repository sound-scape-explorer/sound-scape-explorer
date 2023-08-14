from enum import Enum


class FileSheet(Enum):
    name_ = "file"
    date = "date"
    site = "site"
    label_prefix = "meta_"  # TODO: Change this to `label_`
