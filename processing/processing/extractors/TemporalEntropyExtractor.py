from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class TemporalEntropyExtractor(Extractor):
    """ht"""

    def extract(self, loader: Loader):
        from maad import features

        data = []

        for slice_ in self.sound_walk(loader):
            temporal_entropy = features.temporal_entropy(slice_.sound)
            data.append([temporal_entropy])

        return data
