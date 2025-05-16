from enum import Enum

from processing.enums import StorageDomain, ExtractionStoragePath
from processing.paths.PathRegistry import PathRegistry


_domain = StorageDomain.extractions
_paths = ExtractionStoragePath


class ExtractionPath(Enum):
    EMBEDDINGS = PathRegistry.register(_domain, _paths.embeddings)
    STARTS = PathRegistry.register(_domain, _paths.starts)
    ENDS = PathRegistry.register(_domain, _paths.ends)
