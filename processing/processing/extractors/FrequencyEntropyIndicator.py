from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class FrequencyEntropyExtractor(Extractor):
    """hf"""

    def extract(self, loader: Loader):
        from maad import features

        data = []

        for slice_ in self.sound_walk(loader):
            spectrogram = loader.sound.get_spectrogram(slice_)
            hf, _ = features.frequency_entropy(spectrogram.s)
            data.append([hf])

        return data
