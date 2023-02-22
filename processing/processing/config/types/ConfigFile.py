from typing import Dict, List, TypedDict


class ConfigFile(TypedDict):
    """Configuration file interface.

    Attributes:
        timestamp: The timestamp.
        site: The site.
        tag: The tag.
        meta: The meta values
    """
    timestamp: int
    site: str
    tag: str
    meta: Dict[str, List[str]]
