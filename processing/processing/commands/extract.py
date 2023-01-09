import gzip
import pickle

import click
import numpy

from processing.classes.Config import Config
from processing.classes.Extractor import Extractor
from processing.cli import cli
from processing.utils.iterate_audio_files_with_bands import \
    iterate_audio_files_with_bands


@cli.group()
def extract():
    pass


# noinspection PyShadowingBuiltins
@extract.command()
@click.option('--force/--no-force', '-f', default=False)
@click.option('--skip-existing/--no-skip-existing', '-s', default=False)
def all(force: bool, skip_existing: bool) -> None:
    Extractor(force, skip_existing)


@extract.command()
def show_features_size() -> None:
    cfg = Config().get()
    for esr, band, spec, fname, info, input_path, feat_path in \
            iterate_audio_files_with_bands(
                cfg, ['@feature_base', '.pklz']
            ):

        if feat_path.exists():
            with gzip.open(feat_path, "rb") as f:
                r = pickle.loads(f.read())

                # e.g. (65, 128) where 65 ~ 60sec/0.92(s/window)
                print(f'... {feat_path} {numpy.shape(r)}')
