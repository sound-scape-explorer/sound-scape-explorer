from processing.extractors.Extractor import Extractor
from processing.loaders.Loader import Loader


class AcousticComplexityExtractor(Extractor):
    """aci"""

    def extract(self, loader: Loader):
        from maad import features

        data = []

        for slice_ in self.sound_walk(loader):
            spectrogram = loader.sound.get_spectrogram(slice_, "amplitude")
            _, _, aci = features.acoustic_complexity_index(spectrogram.s)
            data.append([aci])

        return data
