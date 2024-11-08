from typing import List, Literal

import torch
from torch import Tensor, cuda

from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class LogMelSpectrumExtractor(Extractor):
    def __init__(self) -> None:
        self.device: Literal["cuda", "cpu"]
        self.device = self.load_device()

        self.mel_count: int = 64
        self.offset: int = 0
        self.step: int = 1000

    # noinspection DuplicatedCode
    @staticmethod
    def load_device():
        if cuda.is_available():
            print("Using GPU")
            return "cuda"
        else:
            print("Using CPU")
            return "cpu"

    def convert_to_mel_oneSpectrum(
        self,
        wav: Tensor,
        sample_rate: int,
    ) -> Tensor:
        import torchaudio

        data = wav.reshape(-1)
        mel_extractor = torchaudio.transforms.MelSpectrogram(
            # TODO: we should allow user to set custom mel count and windowing settings
            sample_rate=sample_rate,
            n_fft=sample_rate,
            hop_length=sample_rate,
            f_min=self.band.low,
            f_max=self.band.high,
            n_mels=self.mel_count,
            win_length=sample_rate,
            power=1,
        )

        mel_extractor = mel_extractor.to(data.device)

        mel = mel_extractor(data)
        log: Tensor = torch.log(mel + 0.1)
        mel_frames = log.float()
        return mel_frames.T[:60, :]

    def extract(self, loader: Loader):
        wav = loader.torch.audio
        sample_rate = loader.torch.sample_rate

        assert wav is not None and sample_rate is not None, "not loaded"
        assert sample_rate == self.expected_sample_rate, "Sample rates do not match."

        # `batch` acts as the maximum audio duration of 5 minutes.
        batch = sample_rate * 60 * 5
        tensors: List[Tensor] = []

        i = 0
        while i < wav.shape[1]:
            start = i
            end = i + batch
            wav_slice: Tensor = wav[:, start:end]
            wav_slice_converted = wav_slice.to(self.device)

            mel_slice_one_spectrum = self.convert_to_mel_oneSpectrum(
                wav_slice_converted,
                sample_rate,
            )
            tensor = mel_slice_one_spectrum
            tensors.append(tensor)
            i += batch

        features = torch.concat(tensors)
        return features.tolist()
