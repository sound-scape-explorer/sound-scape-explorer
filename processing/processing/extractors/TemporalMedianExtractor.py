from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class TemporalMedianExtractor(Extractor):
    """med"""

    def extract(self, loader: Loader):
        import maad

        data = []

        for slice_ in self.sound_walk(loader):
            temporal_median = maad.features.temporal_median(slice_.sound)
            data.append([temporal_median])

        return data
