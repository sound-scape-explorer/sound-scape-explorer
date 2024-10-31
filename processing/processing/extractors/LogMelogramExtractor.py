from typing import List, Literal

import numpy as np
import torch
from torch import Tensor, cuda

from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class LogMelogramExtractor(Extractor):
    """Mel Spectrogram"""

    def __init__(self) -> None:
        self.device: Literal["cuda", "cpu"]
        self.device = self.load_device()

        self.mel_count: int = 64
        self.fft_size: int = 2048
        self.offset: int = 0
        self.step: int = 1000

    @staticmethod
    def load_device():
        if cuda.is_available():
            print("Using GPU")
            return "cuda"
        else:
            print("Using CPU")
            return "cpu"

    # noinspection DuplicatedCode
    @staticmethod
    def to_frames(data: Tensor) -> Tensor:
        window_length = hop_length = 100

        num_samples = data.shape[0]
        num_frames = 1 + int(np.floor((num_samples - window_length) / hop_length))
        shape = (num_frames, window_length) + data.shape[1:]

        strides = data.stride(0) * hop_length, data.stride(0), data.stride(1)
        return torch.as_strided(data, shape, strides)

    # noinspection DuplicatedCode
    def convert_to_mel(
        self,
        wav: Tensor,
        sample_rate: int,
        hop_length: int,
    ) -> Tensor:
        import torchaudio

        data = wav.reshape(-1)

        mel_extractor = torchaudio.transforms.MelSpectrogram(
            # TODO: we should allow user to set custom mel count and windowing settings
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

    # noinspection DuplicatedCode
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

            a, _, b, c = mel_slice.shape
            tensor = mel_slice.reshape(a, b * c)

            tensors.append(tensor)
            i += batch

        features = torch.concat(tensors)
        return features.tolist()
