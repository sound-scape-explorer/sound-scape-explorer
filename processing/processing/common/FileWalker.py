from processing.config.files.FileConfig import FileConfig
from processing.common.Interval import Block, Interval


class FileWalker:
    def __init__(
        self,
        file: FileConfig,
        origin: int,
        step: int,
        debug: bool = False,
    ) -> None:
        self.file = file
        self.origin = origin
        self.step = step
        self.debug = debug

        self.load()

    def load(self):
        span = (self.file.end - self.file.start) // self.step

        if self.file.duration < self.step:
            span += 1

        before_remainder = (self.file.start - self.origin) % self.step

        self.before = self.file.start - before_remainder
        self.after = self.before + span * self.step

        if self.file.end > self.after:
            span += 1

        self.span = span

        if self.debug:
            print(
                self.file.index,
                self.span,
                "-",
                self.file.start,
                self.file.end,
                "-",
                self.before,
                self.after,
            )

    def walk(self):
        for i in range(self.span):
            interval_start = self.before + i * self.step
            interval_end = interval_start + self.step

            interval = Interval(
                start=interval_start,
                end=interval_end,
            )

            block = Block(
                file=self.file,
                start=self.file.start if i == 0 else interval_start,
                end=self.file.end if self.file.end < interval_end else interval_end,
            )

            yield interval, block
