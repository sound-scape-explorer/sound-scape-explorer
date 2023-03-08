from processing.common.Env import Env
from processing.config.Config import Config
from processing.extractors.ConfigFilesExtractor import ConfigFilesExtractor
from processing.models.VGGishModel import VGGishModel
from processing.storage.Storage import Storage

env = Env()
config = Config(path=env.config)
storage = Storage(path=env.storage)

bands = storage.get_config_bands()
expected_sample_rate = storage.get_expected_sample_rate()
audio_path = storage.get_audio_path()
files = storage.get_config_files()

storage.delete_files_features()

for band_name, band in bands.items():
    VGGish = VGGishModel(
        f_min=band.low,
        f_max=band.high,
    )

    extractor = ConfigFilesExtractor(
        files=files,
        model=VGGish,
        expected_sample_rate=expected_sample_rate,
        base_path=audio_path,
    )

    extractor.yield_and_store_features(
        band=band_name,
        storage=storage,
    )
