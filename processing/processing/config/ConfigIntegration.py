from typing import List


class ConfigIntegration:
    index: int
    name: str
    duration: int

    def __init__(
        self,
        index: int,
        name: str,
        duration: int,
    ) -> None:
        self.index = index
        self.name = name
        self.duration = duration

    @staticmethod
    def flatten(integrations: List["ConfigIntegration"]):
        names = [i.name for i in integrations]
        durations = [i.duration for i in integrations]

        return names, durations

    @staticmethod
    def reconstruct(
        names: List[str],
        durations: List[int],
    ) -> List["ConfigIntegration"]:
        integrations = []

        for index, name in enumerate(names):
            integration = ConfigIntegration(
                index=index,
                name=name,
                duration=durations[index],
            )

            integrations.append(integration)

        return integrations
