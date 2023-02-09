import time


class NewTimer:
    __start: float
    __value: float = 0
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
        self.__value = 0
        self.__start = self.__get_now()

    def add(self) -> None:
        now = self.__get_now()
        self.__value += now - self.__start
        self.__start = now

    def get_timeleft(
        self,
        iteration_index: int,
        decimals: int = 1,
    ) -> str:
        remaining_iterations = self.__total_iterations - iteration_index

        timeleft = self.__value * remaining_iterations
        units = 'seconds'

        if timeleft >= 60:
            timeleft = timeleft / 60
            units = 'minutes'

        if timeleft >= 60:
            timeleft = timeleft / 60
            units = 'hours'

        return f'{round(timeleft, decimals)} {units}'
