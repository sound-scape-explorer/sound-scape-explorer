class Timer:
    """The timer for processing durations.

    Increment the timer by adding seconds and get timeleft estimates in
    human-readable format.

    Attributes:
        __timer: The timer value.
        __steps_total: The total number of steps to complete the parent task.
    """
    __timer: float = 0
    __steps_total: int

    def __init__(
        self,
        steps_total: int,
    ) -> None:
        """Initializes `Timer` with the expected total number of steps to
        complete the parent task.

        Args:
            steps_total: The total number of steps to complete the parent task.
        """
        self.__steps_total = steps_total
        self.reset()

    def reset(self) -> None:
        """Resets the timer value to 0.

        Returns:
            None
        """
        self.__timer = 0

    def add_seconds(self, seconds: float) -> None:
        """Add seconds to the timer value.

        Args:
            seconds: The number of seconds to add in decimal format.

        Returns:
            None
        """
        self.__timer += seconds

    def get_timeleft(self, step_index: int) -> str:
        """The timeleft estimation at a given step.

        Args:
            step_index: The index of the current step.

        Returns:
            A human-readable formatted string. It can display `minutes` and
            `hours`.
        """
        steps_remaining = self.__steps_total - step_index

        timeleft = self.__timer * steps_remaining  # in seconds

        timeleft = timeleft / 60
        units = 'minutes'

        if timeleft >= 60:
            timeleft = timeleft / 60
            units = 'hours'

        return f'{timeleft:.3} {units}'
