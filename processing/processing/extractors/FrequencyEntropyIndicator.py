import maad

from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class FrequencyEntropyExtractor(Extractor):
    """hf"""

    def extract(self, loader: Loader):
        data = []

        for slice in self.sound_walk(loader):
            spectrogram = loader.sound.get_spectrogram(slice)
            hf, _ = maad.features.frequency_entropy(spectrogram.s)
            data.append([hf])

        return data
