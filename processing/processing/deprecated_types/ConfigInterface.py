from typing import Dict, List, Tuple, TypedDict

from processing.deprecated_types.ConfigVariablesInterface import \
    ConfigVariablesInterface


class ConfigInterface(TypedDict):
    """The shape of exported configuration file."""
    variables: ConfigVariablesInterface
    bands: Dict[str, str]
    files: Dict[str, Tuple[str, str, str, List[str]]]
    meta_properties: List[str]
    meta_contents: List[List[str]]
    umaps: Dict[str, Tuple[int, List[str], List[str], List[str]]]
    ranges: Dict[str, List[str]]
    stringmap: Dict[str, List[str]]
    path: str
    app_version: str
