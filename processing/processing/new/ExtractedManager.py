from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class ExtractedPath(Enum):
    extracted = register_path("extracted")


class ExtractedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ExtractedPath.extracted.value)
