from typing import List, Tuple


class IntegrationConfig:
    def __init__(
        self,
        index: int,
        name: str,
        duration: int,
    ) -> None:
        self.index: int = index
        self.name: str = name
        self.__duration: int = duration  # seconds

    @staticmethod
    def flatten(
        integrations: List["IntegrationConfig"],
    ) -> Tuple[List[str], List[int]]:
        names = [i.name for i in integrations]
        durations = [i.__duration for i in integrations]
        return names, durations

    @staticmethod
    def reconstruct(
        names: List[str],
        durations: List[int],
    ) -> List["IntegrationConfig"]:
        integrations = []

        for index, name in enumerate(names):
            integration = IntegrationConfig(
                index=index,
                name=name,
                duration=durations[index],
            )

            integrations.append(integration)

        return integrations

    @property
    def seconds(self) -> int:
        return self.__duration

    @property
    def milliseconds(self) -> int:
        return self.__duration * 1000
