from processing.common.Env import Env
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


# TODO: Probaly unneeded
def run_trajectories(env: Env):
    storage = Storage(path=env.storage)

    print_new_line()
    print("Trajectories loaded")

    for band, integration in storage.enumerate_bands_and_integrations():
        print(f"Trajectories loaded for band {band}, integration {integration}")

        grouped_features = storage.read_grouped_features(
            band=band, integration=integration
        )

        grouped_timestamps = storage.read_grouped_timestamps(
            band=band, integration=integration
        )

        print(len(grouped_features), len(grouped_timestamps))


if __name__ == "__main__":
    env = Env()
    run_trajectories(env)
