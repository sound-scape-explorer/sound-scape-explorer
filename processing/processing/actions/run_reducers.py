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

    for band, integration in storage.enumerate_bands_and_integrations():
        print_new_line()
        print(
            f"Reducer loaded for band {band.name}"
            f", integration {integration.duration}"
        )
        timer = Timer(len(bands) * len(integrations))

        features = storage.read_grouped_features_all_files(
            band=band,
            integration=integration,
        )

        for reducer in reducers:
            if not reducer.has(
                band=band,
                integration=integration,
            ):
                timer.progress()
                continue

            reducer_instance: Reducer = reducer.create_reducer(
                seed=seed,
            )

            reduced_features = reducer_instance.reduce(features=features[:])

            storage.write_reduced(
                band=band,
                integration=integration,
                reducer=reducer,
                features=reduced_features,
            )

            timer.progress()


if __name__ == "__main__":
    env = Env()
    run_reducers(env)
