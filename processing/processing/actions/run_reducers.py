from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.reducers.Reducer import Reducer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_reducers(env: Env):
    storage = Storage(path=env.storage)

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
                reducer: Reducer = config_reducer.create_reducer(
                    seed=settings["umap_seed"],
                    neighbors=settings["umap_neighbors"],
                    metric=settings["umap_metric"],
                )

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

                reduced_features = reducer.reduce(features=features[:])

                storage.write_reduced(
                    band=band,
                    integration=integration,
                    reducer_index=reducer_index,
                    features=reduced_features,
                )

                timer.progress()


if __name__ == "__main__":
    env = Env()
    run_reducers(env)
