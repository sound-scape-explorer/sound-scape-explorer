import importlib.metadata
import sys

from processing.context import Context


class App:
    @staticmethod
    def quit(context: Context):
        print("Exiting...")
        context.storage.close()
        sys.exit(0)

    @staticmethod
    def get_version() -> str:
        return importlib.metadata.version("sound-scape-explorer")
