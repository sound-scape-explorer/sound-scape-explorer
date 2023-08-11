import os
import sys


def update_python_path():
    current_path = os.getcwd()
    processing_path = f"{current_path}/processing"

    # Append `processing` path to PYTHONPATH
    if processing_path not in sys.path:
        sys.path.append(processing_path)
