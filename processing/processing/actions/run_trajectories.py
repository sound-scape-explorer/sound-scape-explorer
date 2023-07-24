from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def run_trajectories(env: Env):
    storage = Storage(path=env.storage)
    storage.delete_trajectories()

    trajectories = storage.read_config_trajectories()

    if len(trajectories) == 0:
        return

    print_new_line()
    print("Trajectories loaded")

    reducers = storage.read_config_reducers()

    for reducer in reducers:
        for band, integration in storage.enumerate_bands_and_integrations():
            reducer.load(band=band, integration=integration)

            if not reducer.should_calculate():
                continue

            print(
                f"Trajectories loaded for band {band.name}"
                f", integration {integration.name}"
            )

            timer = Timer(len(reducers) * len(trajectories))

            reduced_features = storage.read_reducer(reducer)

            grouped_timestamps = storage.read_grouped_timestamps(
                band=band,
                integration=integration,
            )

            for trajectory in trajectories:
                trajectory.create_instance(
                    band=band,
                    integration=integration,
                    reducer=reducer,
                )

                trajectory.instance.load(
                    features=reduced_features,
                    timestamps=grouped_timestamps,
                    timestamp_start=trajectory.start,
                    timestamp_end=trajectory.end,
                )

                trajectory.instance.calculate()
                storage.write_trajectory(trajectory=trajectory)
                timer.progress()


if __name__ == "__main__":
    env = Env()
    run_trajectories(env)
