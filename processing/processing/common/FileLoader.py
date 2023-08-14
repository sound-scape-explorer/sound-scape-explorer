from processing.config.files.FileConfig import FileConfig
from processing.loaders.Loader import Loader


class FileLoader:
    def __init__(
        self,
        file: FileConfig,
    ) -> None:
        self.file = file
        self.loader = Loader()

    def load(self):
        self.loader.load(self.file)

    def release(self):
        self.loader.release()

    def destroy(self):
        self.loader.destroy()
