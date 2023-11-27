from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class AcousticDiversityIndexExtractor(Extractor):
    """adi"""

    def extract(self, loader: Loader):
        import maad

        data = []

        for slice_ in self.sound_walk(loader):
            spectrogram = loader.sound.get_spectrogram(slice_, "amplitude")

            adi = maad.features.acoustic_diversity_index(
                Sxx=spectrogram.s,
                fn=spectrogram.fn,
                fmax=10000,
                dB_threshold=-30,
            )

            data.append([adi])

        return data
