from setuptools import setup

setup(
    name='SoundScapeExplorer',
    version='0.1.1',
    py_modules=['processing'],
    install_requires=[
        'Click',
    ],
    entry_points={
        'console_scripts': [
            'sse = processing:cli',
            # '_sse-extract-features = extract_features:go',
            # '_sse-preview-features = extract_features:preview',
            # '_sse-band-freqs = extract_features:print_band_freq_bounds',
        ],
    },
)
