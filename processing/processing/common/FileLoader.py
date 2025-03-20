from processing.loaders.Loader import Loader
from processing.new.FileConfigNew import FileConfigNew


class FileLoader:
    def __init__(
        self,
        file: FileConfigNew,
    ) -> None:
        self.file = file
        self.loader = Loader()

    def load(self):
        self.loader.load(self.file)

    def release(self):
        self.loader.release()

    def destroy(self):
        self.loader.destroy()
