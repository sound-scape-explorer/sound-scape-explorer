import time
from typing import Tuple

from processing.utils.print_new_line import print_new_line


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

    @staticmethod
    def __convert_time(
        time_: float,
    ) -> Tuple[float, str]:
        units = "seconds"

        if time_ >= 60:
            time_ = time_ / 60
            units = "minutes"

        if time_ >= 60:
            time_ = time_ / 60
            units = "hours"

        return time_, units

    def __get_timeleft(self) -> Tuple[float, str]:
        iteration_duration = self.__duration / self.__iteration
        remaining_iterations = self.__total_iterations - self.__iteration

        timeleft = iteration_duration * remaining_iterations

        timeleft, units = self.__convert_time(timeleft)

        return timeleft, units

    def progress(
        self,
        decimals: int = 1,
    ) -> None:
        self.__add()

        timeleft, units = self.__get_timeleft()
        string = f"{round(timeleft, decimals)} {units}"

        print(
            f"Progress: {self.__iteration}/{self.__total_iterations}, "
            f"Timeleft: ~{string:<80}",
            end="\r",
        )

        if self.__iteration == self.__total_iterations:
            duration, units = self.__convert_time(self.__duration)
            string = f"{round(duration, decimals)} {units}"

            print(
                f"Progress: {self.__iteration}/{self.__total_iterations}, "
                f"Duration: {string:<80}",
                end="\r",
            )

            print("")
