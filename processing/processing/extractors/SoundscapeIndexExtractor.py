from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class SoundscapeIndexExtractor(Extractor):
    """ndsi"""

    def extract(self, loader: Loader):
        import maad

        data = []

        for slice_ in self.sound_walk(loader):
            spectrogram = loader.sound.get_spectrogram(slice_)

            ndsi, _, _, _ = maad.features.soundscape_index(
                Sxx_power=spectrogram.s,
                fn=spectrogram.fn,
            )

            data.append([ndsi])

        return data
