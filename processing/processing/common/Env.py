import argparse

from processing.common.SingletonMeta import SingletonMeta


class Env(metaclass=SingletonMeta):
    config: str
    storage: str

    def __init__(self) -> None:
        parser = argparse.ArgumentParser()

        parser.add_argument('-c', '--config')
        parser.add_argument('-s', '--storage')

        args = parser.parse_args()

        self.config = args.config
        self.storage = args.storage
