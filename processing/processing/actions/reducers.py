from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line

env = Env()
storage = Storage(path=env.storage)

files = storage.get_files()
bands = storage.get_bands()
integrations = storage.get_integrations_seconds()
integrations_names = storage.get_integrations()
seed = storage.get_umap_seed()
reducers = storage.get_config_reducers()

storage.delete_reduced()

print_new_line()
print(f'Reducers loading {[r.name + str(r.dimensions) for r in reducers]}')

timer = Timer(len(bands) * len(integrations) * len(reducers))

for band in bands:
    for integration in integrations:
        features = storage.get_grouped_features_all_files_flat(
            band=band,
            integration=integration,
        )

        for reducer_index, config_reducer in enumerate(reducers):
            reducer = config_reducer.create_reducer(seed)

            is_in_reducer = storage.is_band_integration_in_reducer(
                reducer=config_reducer,
                band=band,
                integration=integration,
            )

            if not is_in_reducer:
                timer.print_timeleft()
                continue

            features_split = reducer.reduce_and_split(
                features=features,
                files_length=len(files),
            )

            for file_index, _ in enumerate(files):
                storage.write_reduced(
                    band=band,
                    integration=integration,
                    file_index=file_index,
                    reducer_index=reducer_index,
                    features=features_split[file_index],
                )

            timer.print_timeleft()