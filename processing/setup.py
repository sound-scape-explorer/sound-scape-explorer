from setuptools import find_packages, setup

setup(
    name="sse",
    version="10.8.1",
    description="Sound Scape Explorer",
    author="Bamdad Sabbagh",
    author_email="hi@bamdad.fr",
    packages=find_packages(),
    install_requires=[
        # List any dependencies your module has here
    ],
    entry_points={
        "console_scripts": [
            "sse = processing.cli:start",
        ],
    },
)
