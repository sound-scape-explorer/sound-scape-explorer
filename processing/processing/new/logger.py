import logging

from rich.logging import RichHandler


logging.basicConfig(
    level="NOTSET",
    format="%(message)s",
    datefmt="[%X]",
    handlers=[RichHandler()],
)


def configure_logger(is_debug: bool):
    if is_debug:
        return

    logger = get_logger()
    logger.disabled = True

    for module in ["torchaudio", "h5py", "asyncio", "matplotlib", "numba", "torio"]:
        logging.getLogger(module).setLevel(logging.ERROR)


def get_logger():
    return logging.getLogger("rich")


def log_info(payload: str):
    logger = get_logger()
    logger.info(payload)


def log_debug(payload: str):
    logger = get_logger()
    logger.debug(payload)


def log_error(payload: str):
    logger = get_logger()
    logger.error(payload)
