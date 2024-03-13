import os
import platform
from typing import List


def walk_directory(path: str) -> List[str]:
    relative_paths = []
    supported_formats = [".wav", ".mp3", ".flac"]

    for dir_path, _, filenames in os.walk(path):
        for f in filenames:
            for format_ in supported_formats:
                if f.endswith(format_):
                    absolute_path = os.path.join(dir_path, f)
                    relative_path = absolute_path.replace(path, "")

                    if platform.system() == "Windows":
                        relative_path = relative_path.replace("\\", "/")

                    relative_paths.append(relative_path)

    return relative_paths
