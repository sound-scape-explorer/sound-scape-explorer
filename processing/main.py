import argparse
import os
import subprocess
import sys

PathByAction = {
    "all": "processing/processing/actions/_all.py",
    "all-actions": "processing/processing/actions/_all_actions.py",
    "all-but-files": "processing/processing/actions/_all_but_files.py",
    "all-to-groups": "processing/processing/actions/_all_to_groups.py",
    "autocluster": "processing/processing/actions/run_autocluster.py",
    "config": "processing/processing/actions/run_config.py",
    "dataframe": "processing/processing/actions/run_dataframe.py",
    "files": "processing/processing/actions/run_files.py",
    "groups": "processing/processing/actions/run_groups.py",
    "indicators": "processing/processing/actions/run_indicators.py",
    "matrices": "processing/processing/actions/run_matrices.py",
    "migrate-v8": "processing/processing/actions/run_migration_v8.py",
    "pairings": "processing/processing/actions/run_pairings.py",
    "reducers": "processing/processing/actions/run_reducers.py",
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
    # Validate action
    actions = list(PathByAction.keys())

    if args.action not in actions:
        raise KeyError(f'Action "{args.action}" not recognized!')

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
