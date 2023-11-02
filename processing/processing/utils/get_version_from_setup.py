import pkg_resources


def get_version_from_setup() -> str:
    return pkg_resources.require("sse")[0].version
