from processing.audio.Audio import Audio
from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.indicators.Indicator import Indicator
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_indicators(env: Env):
    storage = Storage(path=env.storage)

    indicators = storage.get_indicators()

    if len(indicators) == 0:
        return

    files = storage.read_files()
    bands = storage.get_bands()
    bands_frequencies = storage.get_bands_frequencies()
    integrations = storage.get_integrations_seconds()
    audio_path = storage.get_audio_path()

    storage.delete_indicators()

    print_new_line()
    print(f"Indicators loading: {[i for i in indicators]}")

    for band_index, band in enumerate(bands):
        f_min = bands_frequencies[band_index][0]
        f_max = bands_frequencies[band_index][1]

        for integration in integrations:
            print(f"Band: {band}, integration {integration}")

            slices_per_group = storage.read_slices_per_group(band, integration)
            timer = Timer(
                len(files)
                * len(bands)
                * len(integrations)
                * len(indicators)
                * slices_per_group
            )

            # Loading indicators
            indicators_instances = []
            for indicator_name in indicators:
                indicator = Indicator(
                    name=indicator_name,
                    band=band,
                    integration=integration,
                )

                indicators_instances.append(indicator)

            for file_index, group_index in storage.enumerate_group_indexes(
                band, integration
            ):
                # Loading audio
                file_name = files[file_index]
                path = f"{audio_path}{file_name}"

                audio = Audio(
                    path=path,
                    f_min=f_min,
                    f_max=f_max,
                    integration=integration,
                    group_index=group_index,
                )

                for indicator in indicators_instances:
                    indicator.calculate(audio)
                    timer.progress()

            # Store
            for i, indicator in enumerate(indicators_instances):
                indicator.store(storage, i)


if __name__ == "__main__":
    env = Env()
    run_indicators(env)
