from dataclasses import dataclass


@dataclass(frozen=True)
class YamlEnv:
    config: str
    storage: str
