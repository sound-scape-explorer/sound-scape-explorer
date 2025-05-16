from processing.enums import StorageDomain


_registered_paths = set()


def register_path(domain: StorageDomain, *attributes: str | int):
    path = f"/{domain.value}" + "".join(f"/{attr}" for attr in attributes)

    if path in _registered_paths:
        raise Exception(f"Path {path} already registered")

    _registered_paths.add(path)
    return path


def build_path(path: str, *attributes: str | int):
    if path not in _registered_paths:
        raise Exception(f"Path {path} not registered")

    return path + "".join(f"/{el}" for el in attributes)
