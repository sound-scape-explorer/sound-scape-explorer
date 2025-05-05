from enum import Enum

from processing.paths.path_registry import register_path


class ReducedPath(Enum):
    REDUCED = register_path("reduced")
