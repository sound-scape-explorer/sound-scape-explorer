from enum import Enum

from processing.enums import StorageDomain
from processing.paths.PathRegistry import PathRegistry


class ReductionPath(Enum):
    REDUCTIONS = PathRegistry.register(StorageDomain.reductions)
