import maad

from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class TemporalEntropyExtractor(Extractor):
    """ht"""

    def extract(self, loader: Loader):
        sound = loader.sound.audio

        t = self.offset
        step = self.step

        data = []

        while t < len(sound):
            start = t
            end = start + step

            slice = loader.sound.slice(start, end)
            filtered = loader.sound.filter(slice, self.band.low, self.band.high)

            temporal_entropy = maad.features.temporal_entropy(filtered)

            data.append([temporal_entropy])

            t += step

        return data
