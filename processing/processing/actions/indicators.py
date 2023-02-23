import maad
import soundfile

from processing.indicators.AcousticComplexityIndexIndicator import \
    AcousticComplexityIndexIndicator
from processing.indicators.AcousticDiversityIndexIndicator import \
    AcousticDiversityIndexIndicator
from processing.indicators.FrequencyEntropyIndicator import \
    FrequencyEntropyIndicator
from processing.indicators.LeqEnesIndicator import LeqEnesIndicator
from processing.indicators.LeqMaadIndicator import LeqMaadIndicator
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

            leq_enes = LeqEnesIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            leq_maad = LeqMaadIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            temporal_entropy = TemporalEntropyIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            frequency_entropy = FrequencyEntropyIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            aci = AcousticComplexityIndexIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            adi = AcousticDiversityIndexIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for group_index, _ in enumerate(group):
                # TODO: Retrieve this from configuration
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

                try:
                    spectrogram, \
                        spectrogram_tn, \
                        spectrogram_fn, \
                        spectrogram_ext = \
                        maad.sound.spectrogram(
                            x=sound,
                            fs=sample_rate,
                        )
                except ValueError:
                    spectrogram = None
                    spectrogram_tn = None
                    spectrogram_fn = None
                    spectrogram_ext = None

                # TODO: Rename in spectro_xx ?
                try:
                    spectrogram_amplitude, \
                        spectrogram_amplitude_tn, \
                        spectrogram_amplitude_fn, \
                        spectrogram_amplitude_ext = \
                        maad.sound.spectrogram(
                            x=sound,
                            fs=sample_rate,
                            mode='amplitude',
                        )
                except ValueError:
                    spectrogram_amplitude = None
                    spectrogram_amplitude_tn = None
                    spectrogram_amplitude_fn = None
                    spectrogram_amplitude_ext = None

                # Calculating indicators

                leq_enes.calculate(
                    sound=sound,
                    sample_rate=sample_rate,
                    integration=integration,
                )

                leq_maad.calculate(
                    sound=sound,
                    sample_rate=sample_rate,
                )

                temporal_entropy.calculate(sound)
                frequency_entropy.calculate(spectrogram)
                aci.calculate(spectrogram)
                adi.calculate(
                    spectrogram_amplitude=spectrogram_amplitude,
                    spectrogram_amplitude_fn=spectrogram_amplitude_fn,
                )

            leq_enes.store(storage)
            leq_maad.store(storage)
            temporal_entropy.store(storage)
            frequency_entropy.store(storage)
            aci.store(storage)
