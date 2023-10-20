import argparse
import os
import platform
import sys

from processing.main import main


def update_python_path():
    current_path = os.getcwd()

    if platform.system() == "Windows":
        processing_path = f"{current_path}\\processing"
    else:
        processing_path = f"{current_path}/processing"

    # Append `processing` path to PYTHONPATH
    if processing_path not in sys.path:
        sys.path.append(processing_path)


def start():
    update_python_path()

    parser = argparse.ArgumentParser()
    parser.add_argument("yaml_path")
    args = parser.parse_args()

    main(yaml_path=args.yaml_path)
