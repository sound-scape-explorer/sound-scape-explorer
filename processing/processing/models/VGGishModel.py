from typing import Optional

import numpy as np
import torch
import torchaudio
from torch import Tensor, cuda, hub, nn
from torch.nn import Sequential

from processing.lib.VGG import VGG
from processing.models.AbstractModel import AbstractModel


class VGGishModel(AbstractModel, VGG):
    __sample_rate: int = None
    __mels_count: int = 64
    __fft_size: int = 2048
    __fft_hop_length: int = None
    device: str

    def __init__(
        self,
        f_min: Optional[int] = 0,
        f_max: Optional[int] = 20000,
    ) -> None:
        self.__f_min = f_min
        self.__f_max = f_max

        self.device = self.__get_device()

        print(f"VGGish: loading with {self.device}")

        layers = self.__make_layers()
        super().__init__(layers)

        state_dict = hub.load_state_dict_from_url(
            'https://github.com/harritaylor/torchvggish/'
            'releases/download/v0.1/vggish-10086976.pth',
            progress=True
        )

        super().load_state_dict(state_dict)

        self.to(self.device)

        self.eval()

    @staticmethod
    def __get_device() -> str:
        if cuda.is_available():
            return 'cuda'
        else:
            return 'cpu'

    @staticmethod
    def __make_layers() -> Sequential:
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

    def set_sample_rate(self, sample_rate: int) -> None:
        self.__sample_rate = sample_rate
        self.__fft_hop_length = int(self.__sample_rate / 100)

    @staticmethod
    def __frame(
        data: Tensor,
    ) -> Tensor:
        window_length = hop_length = 100

        num_samples = data.shape[0]
        num_frames = 1 + int(
            np.floor((num_samples - window_length) / hop_length)
        )
        shape = (num_frames, window_length) + data.shape[1:]

        strides = data.stride(0) * hop_length, data.stride(0), data.stride(1)

        return torch.as_strided(data, shape, strides)

    def __convert_wav_to_examples(
        self,
        data: Tensor,
    ) -> Tensor:
        data = data.reshape(-1)

        # TODO: Test performance using nnAudio lib instead of torchaudio
        # TODO: Handle sad cases on bad frequency specifications
        mel_extractor = torchaudio.transforms.MelSpectrogram(
            sample_rate=self.__sample_rate,
            n_fft=self.__fft_size,
            hop_length=self.__fft_hop_length,
            f_min=self.__f_min,
            f_max=self.__f_max,
            n_mels=self.__mels_count,
            win_length=self.__fft_size,
            power=1,
        )

        mel_extractor = mel_extractor.to(data.device)

        mel = mel_extractor(data)
        log: Tensor = torch.log(mel + .1)
        transposed_log: Tensor = log.T

        # Frame features into examples.
        log_mel_examples = self.__frame(
            data=transposed_log,
        )

        log_mel_examples = log_mel_examples[:, None, :, :].float()

        return log_mel_examples

    def forward(
        self,
        x: Tensor,
    ) -> Tensor:
        if self.__sample_rate is None:
            raise AttributeError(f'VGGish: Sample rate is not defined.')

        converted_x = x.to(device=self.device)
        x = self.__convert_wav_to_examples(converted_x)

        return VGG.forward(self, x)
