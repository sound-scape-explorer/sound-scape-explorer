from typing import List, Optional


class ContinuousTimeTrajectory:
    __date_start: int
    __date_end: int
    __color_by: str  # Meta Property
    __rolling_step: int
    __dimensions: int
    segments: List[int]

    def __init__(
        self,
        date_start: int,
        date_end: int,
        color_by: str,
        dimensions: int = 3,
        rolling_step: int = 1,
    ):
        self.__date_start = date_start
        self.__date_end = date_end
        self.__color_by = color_by
        self.__dimensions = dimensions
        self.__rolling_step = rolling_step

        self.run()

    def run(self) -> None:
        # TODO: See utils enes sub v2 line 1462
        pass
