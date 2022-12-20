import json
from typing import Dict


def read_json_file(path: str) -> Dict[str, any]:
    with open(path, "r") as f:
        content = json.load(f)
        return content
