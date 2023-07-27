from typing import List

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
        print_new_line()
        print(
            f"Indicators loaded for band {band.name}"
            f", integration {integration.name}"
        )
        group_counts = storage.read_files_group_counts(integration)
        point_indexes_count = storage.read_point_indexes_count(band, integration)
        timer = Timer(point_indexes_count)

        # Loading indicators
        for indicator in indicators:
            indicator.create_instance(
                band=band,
                integration=integration,
            )

        # Calculating indicators
        for point_index in storage.enumerate_point_indexes(
            band=band,
            integration=integration,
        ):
            file_indexes = storage.get_file_indexes_from_point_index(
                band=band,
                integration=integration,
                point_index=point_index,
            )

            audios: List[Audio] = []

            for file_index_ in file_indexes:
                file_name = files_names[file_index_]
                group_count = group_counts[file_index_][0]
                group_index_ = point_index % group_count
                path = f"{audio_path}{file_name}"

                audio = Audio(
                    path=path,
                    f_min=band.low,
                    f_max=band.high,
                    integration=integration.duration,
                    group_index=group_index_,
                )

                audios.append(audio)

            for audio in audios:
                for indicator in indicators:
                    indicator.instance.calculate(audio)

            timer.progress()

        for indicator in indicators:
            storage.write_indicator(indicator)

        # for _, file_index, group_index in storage.enumerate_point_indexes(
        #     band=band,
        #     integration=integration,
        # ):
        #     # Loading audio
        #     file_name = files_names[file_index]
        #     path = f"{audio_path}{file_name}"
        #
        #     audio = Audio(
        #         path=path,
        #         f_min=band.low,
        #         f_max=band.high,
        #         integration=integration.duration,
        #         group_index=group_index,
        #     )
        #
        # for indicator in indicators:
        #     indicator.instance.calculate(audio=audio)
        #
        #     timer.progress()
        #
        # # Storing indicators
        # # INFO: This could be written incrementally
        # for indicator in indicators:
        #     storage.write_config_indicator(indicator)


if __name__ == "__main__":
    env = Env()
    run_indicators(env)
