from enum import Enum

from processing.enums import StorageDomain
from processing.paths.path_registry import register_path


_domain = StorageDomain.extractions


class ExtractionPath(Enum):
    EMBEDDINGS = register_path(_domain, "embeddings")
    STARTS = register_path(_domain, "starts")
    ENDS = register_path(_domain, "ends")
