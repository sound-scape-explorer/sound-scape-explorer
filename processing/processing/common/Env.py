import argparse
import os

from main import Arguments

from processing.common.SingletonMeta import SingletonMeta


class Env(metaclass=SingletonMeta):
    config: str
    storage: str
    is_docker: bool

    def __init__(self) -> None:
        self.__read_arguments()
        self.__read_env()

    def __read_arguments(self) -> None:
        parser = argparse.ArgumentParser()

        parser.add_argument(Arguments.config[0], Arguments.config[1])
        parser.add_argument(Arguments.storage[0], Arguments.storage[1])

        args = parser.parse_args()

        self.config = args.config
        self.storage = args.storage

    def __read_env(self) -> None:
        is_docker = os.getenv("IS_DOCKER", False)
        self.is_docker = is_docker == "True"
