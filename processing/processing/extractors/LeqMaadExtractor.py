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
                # todo: make this related to microphone sensitivity and recording full scale.
                #       the higher the value, the lower the output dB SPL values.
                # examples with borabora campaign:
                #   - with gain of 1, we get ~150 dB SPL values
                #   - with gain of 42, we get ~120 dB SPL values
                #   - with gain of 100, we get ~70 dB SPL values
                gain=42,
            )

            data.append([leq])

        return data
