from typing import Tuple

import time


class Timer:
    __start: float
    __duration: float
    __duration_init: int = 0
    __iteration: int
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
        self.__duration = self.__duration_init
        self.__start = self.__get_now()
        self.__iteration = 0

    def __get_duration(self) -> float:
        now = self.__get_now()
        duration = now - self.__start
        self.__start = now

        return duration

    def __add(self) -> None:
        duration = self.__get_duration()
        self.__duration += duration
        self.__iteration += 1

    def __get_timeleft(self) -> Tuple[float, str]:
        iteration_duration = self.__duration / self.__iteration
        remaining_iterations = self.__total_iterations - self.__iteration

        timeleft = iteration_duration * remaining_iterations
        units = 'seconds'

        if timeleft >= 60:
            timeleft = timeleft / 60
            units = 'minutes'

        if timeleft >= 60:
            timeleft = timeleft / 60
            units = 'hours'

        return timeleft, units

    def print_timeleft(
        self,
        decimals: int = 1,
    ) -> None:
        self.__add()

        timeleft, units = self.__get_timeleft()
        string = f'{round(timeleft, decimals)} {units}'

        print(
            f'Progress: {self.__iteration}/{self.__total_iterations}, '
            f'Timeleft: ~{string:<80}',
            end='\r',
        )

        if self.__iteration == self.__total_iterations:
            print('')
