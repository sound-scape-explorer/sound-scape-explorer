from processing.config.Config import Config
from processing.extractors.Extractor import FileExtractor
from processing.models.VGGish import VGGish
from processing.storage.Storage import Storage

storage = Storage(path='./sample/sse.h5')
config = Config(path='./sample/config.xlsx')

bands = config.get_bands()
expected_sample_rate = config.get_expected_sample_rate()

storage.delete_files_features()

for band, frequencies in bands.items():
    model = VGGish(
        f_min=frequencies['low'],
        f_max=frequencies['high'],
    )

    extractor = FileExtractor(
        storage=storage,
        config=config,
        model=model,
        expected_sample_rate=expected_sample_rate,
        base_path='./sample/audio',  # TODO get from configuration
    )

    extractor.yield_and_store_features(
        band=band,
    )
