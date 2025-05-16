from enum import Enum
from typing import Optional

from processing.enums import StorageDomain


_registered_paths = set()


class PathRegistry:

    @staticmethod
    def register(
        domain: StorageDomain,
        additional: Optional[Enum] = None,
    ) -> str:
        path = f"/{domain.value}"

        if additional is not None:
            path += f"/{additional.value}"

        if path in _registered_paths:
            raise Exception(f"Path {path} already registered")

        _registered_paths.add(path)
        return path

    @staticmethod
    def build(
        path: str,
        *attributes: str | int,
    ) -> str:
        if path not in _registered_paths:
            raise Exception(f"Path {path} not registered")

        return path + "".join(f"/{el}" for el in attributes)
