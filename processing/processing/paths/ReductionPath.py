from enum import Enum

from processing.enums import StorageDomain
from processing.paths.path_registry import register_path


class ReductionPath(Enum):
    REDUCTIONS = register_path(StorageDomain.reductions)
