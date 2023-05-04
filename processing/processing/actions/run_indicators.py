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

    timer = Timer(len(files) * len(bands) * len(integrations) * len(indicators))

    for band_index, band in enumerate(bands):
        for integration in integrations:
            _, groups_count, _ = storage.read_grouped_features(band, integration)

            for f, file_name in enumerate(files):
                for i, indicator_name in enumerate(indicators):
                    indicator = Indicator(
                        name=indicator_name,
                        band=band,
                        integration=integration,
                        file_index=f,
                    )

                    if indicator is None:
                        continue

                    for g, _ in enumerate(range(groups_count)):
                        path = f"{audio_path}{file_name}"

                        audio = Audio(
                            path=path,
                            f_min=bands_frequencies[band_index][0],
                            f_max=bands_frequencies[band_index][1],
                            integration=integration,
                            group_index=g,
                        )

                        indicator.calculate(audio)

                    indicator.store(storage, i)
                    timer.progress()


if __name__ == "__main__":
    env = Env()
    run_indicators(env)
