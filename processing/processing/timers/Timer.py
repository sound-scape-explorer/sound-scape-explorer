import time


class Timer:
    __start: float
    __duration: float  # duration in seconds for one iteration
    __total_iterations: int

    def __init__(
        self,
        total_iterations: int,
    ) -> None:
        self.reset()
        self.__total_iterations = total_iterations

    @staticmethod
    def __get_now() -> float:
        return time.time()

    def reset(self) -> None:
        self.__duration = -1
        self.__start = self.__get_now()

    def __get_duration(self) -> float:
        now = self.__get_now()
        duration = now - self.__start
        self.__start = now

        return duration

    def add(self) -> None:
        duration = self.__get_duration()

        if self.__duration == -1:
            self.__duration = duration
        else:
            self.__duration = (self.__duration + duration) / 2

    def get_timeleft(
        self,
        iteration_index: int,
        decimals: int = 1,
    ) -> str:
        remaining_iterations = self.__total_iterations - iteration_index

        timeleft = self.__duration * remaining_iterations
        units = 'seconds'

        if timeleft >= 60:
            timeleft = timeleft / 60
            units = 'minutes'

        if timeleft >= 60:
            timeleft = timeleft / 60
            units = 'hours'

        return f'{round(timeleft, decimals)} {units}'
