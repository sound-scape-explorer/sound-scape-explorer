from typing import Dict


class ConfigIntegration:
    name: str
    seconds: int

    def __init__(
        self,
        name: str,
        seconds: int,
    ) -> None:
        self.name = name
        self.seconds = seconds


Integration = str
ConfigIntegrations = Dict[Integration, ConfigIntegration]
