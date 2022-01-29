from mimetypes import init


class Logger:
    def __init__(self, string):
        self.name=string

    def __str__(self) -> str:
        return str(self.name)
