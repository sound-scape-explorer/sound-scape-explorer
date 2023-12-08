import os
from typing import List


def walk_directory(path: str) -> List[str]:
    absolute_paths = []
    supported_formats = [".wav", ".mp3", ".flac"]

    for dir_path, dir_names, filenames in os.walk(path):
        for f in filenames:
            for format_ in supported_formats:
                if f.endswith(format_):
                    absolute_paths.append(os.path.join(dir_path, f))

    relative_paths = [p.replace(path, "") for p in absolute_paths]
    return relative_paths
