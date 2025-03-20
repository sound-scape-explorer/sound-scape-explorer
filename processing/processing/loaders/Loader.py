from processing.loaders.SoundLoader import SoundLoader
from processing.loaders.TorchLoader import TorchLoader
from processing.new.FileConfigNew import FileConfigNew


class Loader:
    torch: TorchLoader
    sound: SoundLoader

    def __init__(self) -> None:
        self.torch = TorchLoader()
        self.sound = SoundLoader()

    def load(self, file: FileConfigNew):
        self.torch.load(file)
        self.sound.load(file)

    def release(self):
        self.torch.release()
        self.sound.release()

    def destroy(self):
        self.torch.destroy()
        self.sound.destroy()
