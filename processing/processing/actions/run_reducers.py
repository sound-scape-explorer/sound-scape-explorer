from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_reducers(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_reduced()

    reducers = storage.read_config_reducers()

    if len(reducers) == 0:
        return

    seed = storage.read_display_umap_seed()

    print_new_line()
    print(f"Reducers list {[r.name + str(r.dimensions) for r in reducers]}")

    for band, integration in storage.enumerate_bands_and_integrations():
        print_new_line()
        print(
            f"Reducer loaded for band {band.name}" f", integration {integration.name}"
        )
        timer = Timer(len(reducers))

        features = storage.read_grouped_features_all_files(
            band=band,
            integration=integration,
        )

        for reducer in reducers:
            reducer.create_instance(
                band=band,
                integration=integration,
            )

            if not reducer.should_calculate():
                timer.progress()
                continue

            reducer.instance.load(
                dimensions=reducer.dimensions,
                seed=seed,
                features=features[:],
            )

            reducer.instance.calculate()
            storage.write_reducer(reducer)
            timer.progress()


if __name__ == "__main__":
    env = Env()
    run_reducers(env)
