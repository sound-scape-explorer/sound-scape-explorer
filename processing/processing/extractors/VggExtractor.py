from typing import List, Literal

import numpy as np
import torch
from torch import Tensor, cuda, hub, nn

from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class VggExtractor(nn.Module, Extractor):
    def __init__(self) -> None:
        super(VggExtractor, self).__init__()

        self.features: nn.Sequential
        self.embeddings: nn.Sequential
        self.device: Literal["cuda", "cpu"]

        # Hardcoding vgg behaviour
        # This is a reflection of the current implementation.
        # `offset` and `step` are not actually read.
        # This is for abstract parent class validation
        self.mel_count: int = 64
        self.fft_size: int = 2048
        self.offset: int = 0
        self.step: int = 1000

        self.load()

    # Loading model
    def load(self):
        self.features = self.load_features()
        self.embeddings = self.load_embeddings()
        self.device = self.load_device()
        self.load_state_dict()
        self.to(self.device)
        self.eval()

    def load_embeddings(self):
        return nn.Sequential(
            nn.Linear(512 * 4 * 6, 4096),
            nn.ReLU(True),
            nn.Linear(4096, 4096),
            nn.ReLU(True),
            nn.Linear(4096, 128),
            nn.ReLU(True),
        )

    def load_features(self):
        layers = []
        in_channels = 1

        for v in [64, "M", 128, "M", 256, 256, "M", 512, 512, "M"]:
            if v == "M":
                layers += [nn.MaxPool2d(kernel_size=2, stride=2)]
            else:
                conv2d = nn.Conv2d(in_channels, v, kernel_size=3, padding=1)
                layers += [conv2d, nn.ReLU(inplace=True)]
                in_channels = v

        return nn.Sequential(*layers)

    def load_state_dict(self):
        state_dict = self.fetch_state_dict()
        super().load_state_dict(state_dict)

    @staticmethod
    def fetch_state_dict():
        return hub.load_state_dict_from_url(
            "https://github.com/harritaylor/torchvggish/"
            "releases/download/v0.1/vggish-10086976.pth",
            progress=True,
        )

    def load_device(self):
        if cuda.is_available():
            print("Using GPU")
            return "cuda"
        else:
            print("Using CPU")
            return "cpu"

    def forward(
        self,
        x: Tensor,
    ) -> Tensor:
        with torch.no_grad():
            x = self.features(x)
            # Transpose the output from features to
            # remain compatible with VGGish embeddings
            x = torch.transpose(x, 1, 3)
            x = torch.transpose(x, 1, 2)
            x = x.contiguous()
            x = x.view(x.size(0), -1)
            return self.embeddings(x)

    def to_frames(self, data: Tensor) -> Tensor:
        window_length = hop_length = 100

        num_samples = data.shape[0]
        num_frames = 1 + int(np.floor((num_samples - window_length) / hop_length))
        shape = (num_frames, window_length) + data.shape[1:]

        strides = data.stride(0) * hop_length, data.stride(0), data.stride(1)

        return torch.as_strided(data, shape, strides)

    def convert_to_mel(
        self,
        wav: Tensor,
        sample_rate: int,
        hop_length: int,
    ) -> Tensor:
        import torchaudio

        data = wav.reshape(-1)

        mel_extractor = torchaudio.transforms.MelSpectrogram(
            sample_rate=sample_rate,
            n_fft=self.fft_size,
            hop_length=hop_length,
            f_min=self.band.low,
            f_max=self.band.high,
            n_mels=self.mel_count,
            win_length=self.fft_size,
            power=1,
        )

        mel_extractor = mel_extractor.to(data.device)

        mel = mel_extractor(data)
        log: Tensor = torch.log(mel + 0.1)
        transposed_log: Tensor = log.T

        # Frame features into examples.
        mel_frames = self.to_frames(data=transposed_log)

        mel_frames = mel_frames[:, None, :, :].float()
        return mel_frames

    def extract(self, loader: Loader):
        wav = loader.torch.audio
        sample_rate = loader.torch.sample_rate

        assert wav is not None and sample_rate is not None, "not loaded"
        assert sample_rate == self.expected_sample_rate, "Sample rates do not match."

        # `batch` acts as the maximum audio duration of 5 minutes.
        batch = sample_rate * 60 * 5
        tensors: List[Tensor] = []
        hop_length = sample_rate // 100

        i = 0
        while i < wav.shape[1]:
            start = i
            end = i + batch
            wav_slice: Tensor = wav[:, start:end]
            wav_slice_converted = wav_slice.to(self.device)
            mel_slice = self.convert_to_mel(
                wav_slice_converted,
                sample_rate,
                hop_length,
            )
            tensor = self.forward(mel_slice)
            tensors.append(tensor)
            i += batch

        features = torch.concat(tensors)
        return features.tolist()
