from enum import Enum

from processing.paths.path_registry import register_path


class ExtractedPath(Enum):
    EMBEDDINGS = register_path("extracted", "embeddings")
    STARTS = register_path("extracted", "starts")
    ENDS = register_path("extracted", "ends")
