from processing.audio.Audio import Audio
from processing.indicators.AcousticComplexityIndexIndicator import \
    AcousticComplexityIndexIndicator
from processing.indicators.AcousticDiversityIndexIndicator import \
    AcousticDiversityIndexIndicator
from processing.indicators.BioacousticsIndexIndicator import \
    BioacousticsIndexIndicator
from processing.indicators.FrequencyEntropyIndicator import \
    FrequencyEntropyIndicator
from processing.indicators.LeqEnesIndicator import LeqEnesIndicator
from processing.indicators.LeqMaadIndicator import LeqMaadIndicator
from processing.indicators.SoundscapeIndexIndicator import \
    SoundscapeIndexIndicator
from processing.indicators.TemporalEntropyIndicator import \
    TemporalEntropyIndicator
from processing.indicators.TemporalMedianIndicator import \
    TemporalMedianIndicator
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

            med = TemporalMedianIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            ht = TemporalEntropyIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            hf = FrequencyEntropyIndicator(
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

            bi = BioacousticsIndexIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            ndsi = SoundscapeIndexIndicator(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for group_index, _ in enumerate(group):
                # TODO: Retrieve this from configuration
                path = f'./sample/audio{file_name}'

                audio = Audio(
                    path=path,
                    f_min=bands_frequencies[band_index][0],
                    f_max=bands_frequencies[band_index][1],
                    integration=integration,
                    group_index=group_index,
                )

                # Calculating indicators

                leq_enes.calculate(audio)
                leq_maad.calculate(audio)
                med.calculate(audio)
                ht.calculate(audio)
                hf.calculate(audio)
                aci.calculate(audio)
                adi.calculate(audio)
                bi.calculate(audio)
                ndsi.calculate(audio)

            leq_enes.store(storage)
            leq_maad.store(storage)
            med.store(storage)
            ht.store(storage)
            hf.store(storage)
            aci.store(storage)
            adi.store(storage)
            bi.store(storage)
            ndsi.store(storage)
