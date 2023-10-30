import pkg_resources

from constants import CLI_NAME


def get_version_from_setup() -> str:
    return pkg_resources.require(CLI_NAME)[0].version
