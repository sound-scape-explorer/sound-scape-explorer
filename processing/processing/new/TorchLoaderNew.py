from typing import Union

from torch import Tensor

from processing.new.FileConfigNew import FileConfigNew


class TorchLoaderNew:
    audio: Union[Tensor, None]
    sample_rate: Union[int, None]

    def __init__(self):
        self.audio = None
        self.sample_rate = None

    def load(self, file: FileConfigNew):
        import torchaudio

        # noinspection PyUnresolvedReferences
        self.audio, self.sample_rate = torchaudio.load(file.absolute_path)
        return self

    def release(self):
        self.audio = None
        self.sample_rate = None
