import argparse
import os
import subprocess
import sys

PathByAction = {
    "all": "processing/processing/actions/_all.py",
    "all-actions": "processing/processing/actions/_all_actions.py",
    "all-but-files": "processing/processing/actions/_all_but_files.py",
    "all-to-groups": "processing/processing/actions/_all_to_groups.py",
    "autoclusters": "processing/processing/actions/run_autoclusters.py",
    "computation-umaps": "processing/processing/actions/run_computation_umaps.py",
    "computation-umaps-purge": "processing/processing/actions/run_computation_umaps_purge.py",
    "config": "processing/processing/actions/run_config.py",
    "dataframe": "processing/processing/actions/run_dataframe.py",
    "extractions": "processing/processing/actions/run_extractions.py",
    "files": "processing/processing/actions/run_files.py",
    "groups": "processing/processing/actions/run_groups.py",
    "indicators": "processing/processing/actions/run_indicators.py",
    "matrices": "processing/processing/actions/run_matrices.py",
    "mean-distances-matrix": "processing/processing/actions/run_mean_distances_matrix.py",
    "mean-distances-matrix-purge": "processing/processing/actions/run_mean_distances_matrix_purge.py",
    "pairings": "processing/processing/actions/run_pairings.py",
    "reducers": "processing/processing/actions/run_reducers.py",
    "trajectories": "processing/processing/actions/run_trajectories.py",
    "volumes": "processing/processing/actions/run_volumes.py",
}


class Arguments:
    action = ["-a", "--action"]
    config = ["-c", "--config"]
    storage = ["-s", "--storage"]
    band = ["-b", "--band"]
    integration = ["-i", "--integration"]
    output = ["-o", "--output"]


def run_main(args: argparse.Namespace) -> None:
    """The main entry point after submitting command in terminal.

    See available actions in map `PathByAction`.

    Args:
        args: The arguments described in the class `Arguments`.

    Returns:
        None

    Raises:
        KeyError: An error occured because the action has not been found.
    """

    # Validate action
    actions = list(PathByAction.keys())

    if args.action not in actions:
        raise KeyError(f"Unable to find action {args.action}.")

    current_path = os.getcwd()
    processing_path = f"{current_path}/processing"

    # Append `processing` path to PYTHONPATH
    if processing_path not in sys.path:
        sys.path.append(processing_path)

    path = PathByAction[args.action]

    # Generate command
    command = [
        "python3",
        path,
        Arguments.config[1] if args.config else None,
        args.config if args.config else None,
        Arguments.storage[1] if args.storage else None,
        args.storage if args.storage else None,
        Arguments.band[1] if args.band else None,
        args.band if args.band else None,
        Arguments.integration[1] if args.integration else None,
        args.integration if args.integration else None,
        Arguments.output[1] if args.output else None,
        args.output if args.output else None,
    ]

    # Filter command
    filtered_command = []
    for argument in command:
        if argument is None:
            continue

        filtered_command.append(argument)

    # Print to console
    filtered_command_as_string = " ".join(filtered_command)
    print(f"Running action: {args.action}")
    print(filtered_command_as_string)

    # Run command
    subprocess.run(filtered_command)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    # Main
    parser.add_argument(Arguments.action[0], Arguments.action[1])

    # Action
    parser.add_argument(Arguments.config[0], Arguments.config[1])
    parser.add_argument(Arguments.storage[0], Arguments.storage[1])

    # Dataframe
    parser.add_argument(Arguments.band[0], Arguments.band[1])
    parser.add_argument(Arguments.integration[0], Arguments.integration[1])
    parser.add_argument(Arguments.output[0], Arguments.output[1])

    args = parser.parse_args()

    run_main(args)
