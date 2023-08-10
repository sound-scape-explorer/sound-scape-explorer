import maad

from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class SoundscapeIndexExtractor(Extractor):
    """ndsi"""

    def extract(self, loader: Loader):
        data = []

        for slice in self.sound_walk(loader):
            spectrogram = loader.sound.get_spectrogram(slice)

            ndsi, _, _, _ = maad.features.soundscape_index(
                Sxx_power=spectrogram.s,
                fn=spectrogram.fn,
            )

            data.append([ndsi])

        return data
