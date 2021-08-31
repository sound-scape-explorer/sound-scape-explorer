from setuptools import setup

setup(
    name='SoundScapeExplorer',
    version='0.1.1',
    py_modules=['sserunner'],
    install_requires=[
        'Click',
    ],
    entry_points={
        'console_scripts': [
            'sse = sserunner:cli',
            '_sse-extract-features = extract_features:go',
            '_sse-preview-features = extract_features:preview',
        ],
    },
)
