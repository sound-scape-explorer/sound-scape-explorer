from processing.new.FileConfigNew import FileConfigNew


class TorchLoaderNew:
    def __init__(self):
        self.audio = None
        self.sample_rate = None

    def load(self, file: FileConfigNew):
        import torchaudio

        self.audio, self.sample_rate = torchaudio.load(file.absolute_path)  # type: ignore
        return self

    def release(self):
        self.audio = None
        self.sample_rate = None
