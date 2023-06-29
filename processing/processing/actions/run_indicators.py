from processing.audio.Audio import Audio
from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.indicators.Indicator import Indicator
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_indicators(env: Env):
    storage = Storage(path=env.storage)

    indicators = storage.read_indicators()

    if len(indicators) == 0:
        return

    files = storage.read_files()
    bands_frequencies = storage.get_bands_frequencies()
    audio_path = storage.read_audio_path()

    storage.delete_indicators()

    print_new_line()
    print(f"Indicators loading: {[i for i in indicators]}")

    for (
        band_index,
        band,
        _,
        integration,
    ) in storage.enumerate_bands_and_integrations_with_indexes():
        print(f"Band: {band}, integration {integration}")

        timer = Timer(len(files) * len(indicators))

        f_min = bands_frequencies[band_index][0]
        f_max = bands_frequencies[band_index][1]

        # Loading indicators
        indicators_instances = []

        for indicator_name in indicators:
            indicator = Indicator(
                name=indicator_name,
                band=band,
                integration=integration,
            )

            indicators_instances.append(indicator)

        for file_index, groups_count, _, _, _ in storage.enumerate_files(
            band=band,
            integration=integration,
        ):
            for group_index in range(groups_count):
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
