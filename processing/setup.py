from setuptools import find_packages, setup

from env import APP_NAME, CLI_NAME

setup(
    name=CLI_NAME,
    version="11.4.1",
    description=APP_NAME,
    author="Bamdad Sabbagh",
    author_email="hi@bamdad.fr",
    packages=find_packages(),
    install_requires=[
        # List any dependencies your module has here
    ],
    entry_points={
        "console_scripts": [
            f"{CLI_NAME} = processing.cli:start_processing",
            f"{CLI_NAME}_config = processing.cli:extract_config",
            f"{CLI_NAME}_vis = processing.cli:start_front",
        ],
    },
)
