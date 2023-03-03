from processing.audio.Audio import Audio
from processing.indicators.Indicator import Indicator
from processing.storage.Storage import Storage

storage = Storage(path='./sample/sse.h5')

files = storage.get_files()
bands = storage.get_bands()
bands_frequencies = storage.get_bands_frequencies()
integrations = storage.get_integrations_seconds()
audio_path = storage.get_audio_path()
indicators = storage.get_indicators()

storage.delete_group_indicators()

for band_index, band in enumerate(bands):
    for integration in integrations:
        for file_index, file_name in enumerate(files):
            group = storage.get_grouped_features(band, integration, file_index)

            for name in indicators:
                indicator = Indicator(
                    name=name,
                    band=band,
                    integration=integration,
                    file_index=file_index,
                )

                for group_index, _ in enumerate(group):
                    path = f'{audio_path}{file_name}'

                    audio = Audio(
                        path=path,
                        f_min=bands_frequencies[band_index][0],
                        f_max=bands_frequencies[band_index][1],
                        integration=integration,
                        group_index=group_index,
                    )

                    indicator.calculate(audio)

                indicator.store(storage)
