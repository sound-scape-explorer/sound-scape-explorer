from processing.config.ConfigFile import ConfigFile
from processing.loaders.Loader import Loader


class FileLoader:
    def __init__(
        self,
        file: ConfigFile,
    ) -> None:
        self.file = file
        self.loader = Loader()

    def load(self):
        self.loader.load(self.file)

    def release(self):
        self.loader.release()

    def destroy(self):
        self.loader.destroy()
