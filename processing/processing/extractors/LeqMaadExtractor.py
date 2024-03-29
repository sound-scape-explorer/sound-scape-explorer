from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class LeqMaadExtractor(Extractor):
    def extract(self, loader: Loader):
        from maad import features

        sample_rate = loader.sound.sample_rate

        data = []

        for slice_ in self.sound_walk(loader):
            leq = features.temporal_leq(
                s=slice_.sound,
                fs=sample_rate,
                gain=42,
            )

            data.append([leq])

        return data
