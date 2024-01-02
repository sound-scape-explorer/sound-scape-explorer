from setuptools import find_packages, setup

# INFO: Upon changing `sse` name, change string value in
# processing/utils/get_version_from_setup.py
setup(
    name="sse",
    version="12.3.0",
    description="SoundScapeExplorer",
    author="Bamdad Sabbagh",
    author_email="hi@bamdad.fr",
    packages=find_packages(),
    install_requires=[
        # List any dependencies your module has here
    ],
    entry_points={
        "console_scripts": [
            "sse = processing.cli:start_processing",
            "sse_config = processing.cli:extract_config",
            "sse_vis = processing.cli:start_visualisation",
            "sse_viz = processing.cli:start_visualisation",
            "sse_fill = processing.cli:start_fill",
            "sse_audio = processing.cli:start_audio",
        ],
    },
)
