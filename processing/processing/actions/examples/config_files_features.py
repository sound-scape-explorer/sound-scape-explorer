from processing.config.Config import Config
from processing.extractors.ConfigFilesExtractor import ConfigFilesExtractor
from processing.models.VGGishModel import VGGishModel

config = Config(path='./sample/config.xlsx')

bands = config.get_bands()
expected_sample_rate = config.get_expected_sample_rate()
files = config.get_files()

for _, band in bands.items():
    VGGish = VGGishModel(
        f_min=band.low,
        f_max=band.high,
    )

    extractor = ConfigFilesExtractor(
        files=files,
        model=VGGish,
        expected_sample_rate=expected_sample_rate,
        base_path='./sample/audio',
    )

    for features, file_index in extractor.yield_features():
        print(features)
