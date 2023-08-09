import maad

from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class LeqMaadExtractor(Extractor):
    def extract(self, loader: Loader):
        sound = loader.sound.audio
        sample_rate = loader.sound.sample_rate

        t = self.offset
        step = self.step

        data = []

        while t < len(sound):
            start = t
            end = start + step

            slice = loader.sound.slice(start, end)
            filtered = loader.sound.filter(slice, self.band.low, self.band.high)

            leq = maad.features.temporal_leq(
                s=filtered,
                fs=sample_rate,
                gain=42,
            )

            data.append([leq])

            t += step

        return data
