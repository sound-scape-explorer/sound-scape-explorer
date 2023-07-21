from processing.audio.Audio import Audio
from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_indicators(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_indicators()

    indicators = storage.read_config_indicators()

    if len(indicators) == 0:
        return

    files_names = storage.read_files_names()
    audio_path = storage.read_audio_path()

    print_new_line()
    print(f"Indicators list {[i.name for i in indicators]}")

    for band, integration in storage.enumerate_bands_and_integrations():
        print(
            f"Indicators loaded for band {band.name}"
            f", integration {integration.duration}"
        )

        timer = Timer(len(files_names) * len(indicators))

        # Loading indicators
        for indicator in indicators:
            indicator.create_instance(
                band=band,
                integration=integration,
            )

        # Calculating indicators
        for file_index, groups_count, _, _, _ in storage.enumerate_files(
            band=band,
            integration=integration,
        ):
            for group_index in range(groups_count):
                # Loading audio
                file_name = files_names[file_index]
                path = f"{audio_path}{file_name}"

                audio = Audio(
                    path=path,
                    f_min=band.low,
                    f_max=band.high,
                    integration=integration.duration,
                    group_index=group_index,
                )

                for indicator in indicators:
                    indicator.instance.calculate(audio=audio)

            timer.progress()

        # Storing indicators
        for indicator in indicators:
            storage.write_indicator(indicator)


if __name__ == "__main__":
    env = Env()
    run_indicators(env)
