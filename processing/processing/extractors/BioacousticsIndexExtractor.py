from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class BioacousticsIndexExtractor(Extractor):
    """bi"""

    def extract(self, loader: Loader):
        import maad

        data = []

        for slice_ in self.sound_walk(loader):
            spectrogram = loader.sound.get_spectrogram(slice_, "amplitude")

            bi = maad.features.bioacoustics_index(
                Sxx=spectrogram.s,
                fn=spectrogram.fn,
            )

            data.append([bi])

        return data
