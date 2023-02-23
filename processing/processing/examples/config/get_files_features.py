from processing.config.Config import Config
from processing.extractors.ConfigFilesExtractor import ConfigFilesExtractor
from processing.models.VGGishModel import VGGishModel

config = Config(path='./sample/config.xlsx')

bands = config.get_bands()
expected_sample_rate = config.get_expected_sample_rate()

for band, frequencies in bands.items():
    VGGish = VGGishModel(
        f_min=frequencies['low'],
        f_max=frequencies['high'],
    )

    extractor = ConfigFilesExtractor(
        config=config,
        model=VGGish,
        expected_sample_rate=expected_sample_rate,
        base_path='./sample/audio',
    )

    for features, file_index in extractor.yield_features():
        print(features)
