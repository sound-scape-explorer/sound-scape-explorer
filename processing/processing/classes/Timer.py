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

    def get_estimate(self):
        duration = self.__timer * self.__total_iterations
        units = 'seconds'

        return f'{duration} {units}'
