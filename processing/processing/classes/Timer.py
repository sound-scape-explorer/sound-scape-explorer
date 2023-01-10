class Timer:
    __timer: float = 0
    __total_iterations: int

    def __init__(
        self,
        total_iterations: int,
    ):
        self.__total_iterations = total_iterations
        self.reset()

    def reset(self):
        self.__timer = 0

    def add_seconds(self, seconds: float):
        self.__timer += seconds

    def get_estimate(self, iteration_number: int):
        remaining_iterations = self.__total_iterations - iteration_number
        duration = self.__timer * remaining_iterations
        duration = duration / 60
        units = 'minutes'

        if duration >= 60:
            duration = duration / 60
            units = 'hours'

        return f'{duration:.3} {units}'
