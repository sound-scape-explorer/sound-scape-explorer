import maad
import soundfile

from processing.indicators.EnesLeqIndicator import EnesLeqIndicator
from processing.indicators.MaadLeqIndicator import MaadLeqIndicator
from processing.indicators.TemporalEntropyIndicator import \
    TemporalEntropyIndicator
from processing.storage.Storage import Storage

storage = Storage(path='./sample/sse.h5')

files = storage.get_files()

bands = storage.get_bands()
bands_frequencies = storage.get_bands_frequencies()

integrations = storage.get_integrations()

storage.delete_group_indicators()

for band_index, band in enumerate(bands):
    for integration in integrations:
        for file_index, file_name in enumerate(files):
            group = storage.get_group_features(band, integration, file_index)

            enes_leq_indicator = EnesLeqIndicator(
                storage=storage,
                band=band,
                integration=integration,
                file_index=file_index,
            )

            maad_leq_indicator = MaadLeqIndicator(
                storage=storage,
                band=band,
                integration=integration,
                file_index=file_index,
            )

            temporal_entropy_indicator = TemporalEntropyIndicator(
                storage=storage,
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for group_index, _ in enumerate(group):
                path = f'./sample/audio{file_name}'

                wav_info = soundfile.info(path)
                frames = integration * wav_info.samplerate
                start = group_index * frames

                wav, sample_rate = soundfile.read(
                    file=path,
                    frames=frames,
                    start=start,
                )

                f_min = bands_frequencies[band_index][0]
                f_max = bands_frequencies[band_index][1]

                frequencies = [f_min, f_max]

                # TODO: Talk about this... `maad.select_bandwidth()` does not
                #  allow `0` as frequency value
                if 0 in frequencies:
                    for i, _ in enumerate(frequencies):
                        if frequencies[i] == 0:
                            frequencies[i] = 1

                sound = maad.sound.select_bandwidth(
                    x=wav,
                    fs=sample_rate,
                    fcut=frequencies,
                    forder=6,
                    fname='butter',
                    ftype='bandpass',
                )

                enes_leq_indicator.calculate(
                    sound=sound,
                    sample_rate=sample_rate,
                    integration=integration,
                )

                maad_leq_indicator.calculate(
                    sound=sound,
                    sample_rate=sample_rate,
                )

                temporal_entropy_indicator.calculate(sound=sound)

            enes_leq_indicator.store()
            maad_leq_indicator.store()
            temporal_entropy_indicator.store()
