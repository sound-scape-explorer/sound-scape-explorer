from typing import Optional, Tuple

import torchaudio
from torch import Tensor

from processing.config.files.FileConfig import FileConfig


class TorchLoader:
    audio: Optional[Tensor] = None
    sample_rate: Optional[int] = None

    def destroy(self):
        # this will raise `AttributeError` if you try loading the file again
        del self.audio
        del self.sample_rate

    def release(self):
        self.audio = None
        self.sample_rate = None

    def load(self, file: FileConfig):
        if self.audio is not None and self.sample_rate is not None:
            return self.audio, self.sample_rate

        loaded: Tuple[Tensor, int] = torchaudio.load(file.path)  # type: ignore
        self.audio, self.sample_rate = loaded
        return self.audio, self.sample_rate
