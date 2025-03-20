from typing import Optional, Tuple

from processing.new.FileConfigNew import FileConfigNew


class TorchLoader:
    def __init__(self) -> None:
        from torch import Tensor

        self.audio: Optional[Tensor] = None
        self.sample_rate: Optional[int] = None

    def destroy(self):
        # this will raise `AttributeError` if you try loading the file again
        del self.audio
        del self.sample_rate

    def release(self):
        self.audio = None
        self.sample_rate = None

    def load(self, file: FileConfigNew):
        import torchaudio
        from torch import Tensor

        if self.audio is not None and self.sample_rate is not None:
            return self.audio, self.sample_rate

        loaded: Tuple[Tensor, int] = torchaudio.load(file.absolute_path)
        self.audio, self.sample_rate = loaded
        return self.audio, self.sample_rate
