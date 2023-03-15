import argparse
import os

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

        parser.add_argument('-c', '--config')
        parser.add_argument('-s', '--storage')

        args = parser.parse_args()

        self.config = args.config
        self.storage = args.storage

    def __read_env(self) -> None:
        is_docker = os.getenv('IS_DOCKER', False)
        self.is_docker = is_docker == 'True'
