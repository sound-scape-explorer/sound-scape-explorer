from enum import Enum

from processing.new.paths import register_path


# TODO: add variation depending on nn extractor and acoustic indices
class ExtractedPath(Enum):
    extracted = register_path("extracted")
