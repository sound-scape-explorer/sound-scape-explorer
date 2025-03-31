from processing.context import Context
from processing.new.ExtractedPath import ExtractedPath


# TODO: add exists, and to storage methods after timeline refactor
class ExtractedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ExtractedPath.extracted.value)
