from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_reducers(env: Env):
    storage = Storage(path=env.storage)

    files = storage.read_files()
    bands = storage.get_bands()
    integrations = storage.get_integrations_seconds()
    settings = storage.read_settings()
    reducers = storage.get_config_reducers()

    storage.delete_reduced()

    print_new_line()
    print(f"Reducers loading {[r.name + str(r.dimensions) for r in reducers]}")

    timer = Timer(len(bands) * len(integrations) * len(reducers))

    for band in bands:
        for integration in integrations:
            features = storage.read_grouped_features_all_files(
                band=band,
                integration=integration,
            )

            for reducer_index, config_reducer in enumerate(reducers):
                reducer = config_reducer.create_reducer(settings["umap_seed"])

                if reducer is None:
                    continue

                is_in_reducer = storage.is_band_integration_in_reducer(
                    reducer=config_reducer,
                    band=band,
                    integration=integration,
                )

                if not is_in_reducer:
                    timer.progress()
                    continue

                features_split = reducer.reduce_and_split(
                    features=features,  # type: ignore
                    files_length=len(files),
                )

                for file_index in storage.enumerate_file_indexes():
                    storage.write_reduced(
                        band=band,
                        integration=integration,
                        file_index=file_index,
                        reducer_index=reducer_index,
                        features=features_split[file_index],
                    )

                timer.progress()


if __name__ == "__main__":
    env = Env()
    run_reducers(env)
