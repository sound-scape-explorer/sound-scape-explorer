from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.reducers.Reducer import Reducer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_reducers(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_reduced()

    reducers = storage.read_config_reducers()

    if len(reducers) == 0:
        return

    bands = storage.read_config_bands()
    integrations = storage.read_config_integrations()
    seed = storage.read_display_umap_seed()

    print_new_line()
    print(f"Reducers list {[r.name + str(r.dimensions) for r in reducers]}")

    timer = Timer(len(bands) * len(integrations) * len(reducers))

    for band, integration in storage.enumerate_bands_and_integrations():
        print(
            f"Reducer loaded for band {band.name}"
            f", integration {integration.duration}"
        )

        features = storage.read_grouped_features_all_files(
            band=band,
            integration=integration,
        )

        for reducer_index, config_reducer in enumerate(reducers):
            reducer: Reducer = config_reducer.create_reducer(
                seed=seed,
            )

            if not config_reducer.has(
                band=band,
                integration=integration,
            ):
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
