from processing.config.files.FileConfig import FileConfig
from processing.loaders.SoundLoader import SoundLoader
from processing.loaders.TorchLoader import TorchLoader


class Loader:
    torch: TorchLoader
    sound: SoundLoader

    def __init__(self) -> None:
        self.torch = TorchLoader()
        self.sound = SoundLoader()

    def load(self, file: FileConfig):
        self.torch.load(file)
        self.sound.load(file)

    def release(self):
        self.torch.release()
        self.sound.release()

    def destroy(self):
        self.torch.destroy()
        self.sound.destroy()
