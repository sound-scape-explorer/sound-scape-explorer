from enum import Enum

from processing.new.paths import register_path


class ExtractedPath(Enum):
    extracted = register_path("extracted")
