import gzip
import pathlib
import pickle
import subprocess

import click
import numpy

from processing.classes.Config import Config
from processing.cli import cli
from processing.utils.iterate_audio_files_with_bands import \
    iterate_audio_files_with_bands


@cli.group()
def extract():
    pass


@extract.command()
@click.option('--file', '-f', default=None)
@click.option('--start', '-s', '-ss', default=None)
@click.option('--duration', '-dur', '-t', default=None)
@click.option('--no-ffmpeg', '--ffmpeg', default=False)
def preview(file: str, start: int, duration: int, no_ffmpeg: bool) -> None:
    cfg = Config().get()
    suffix = cfg.variables['audio_suffix']
    expected_sr = cfg.variables['audio_expected_sample_rate']
    start_sec = cfg.variables.get(
        'preview_file_start',
        '0'
    ) if start is None else start
    dur_sec = cfg.variables.get(
        'preview_file_dur',
        '10'
    ) if duration is None else duration
    fname = cfg.variables['preview_file'] if file is None else file

    for band, spec in cfg.bands.items():

        input_path = pathlib.Path(
            cfg.variables['audio_base']
        ).joinpath(
            fname + suffix
        )

        output_path = pathlib.Path(
            cfg.variables['generated_base']
        ).joinpath(
            'preview-spectrogram', band + '.png'
        )

        # own_call(['preview-features', input_path, output_path, spec,
        # expected_sr, start_sec, dur_sec])

        import sys

        sys.argv = [
            'extract_features.py',
            input_path,
            output_path,
            spec,
            expected_sr,
            start_sec,
            dur_sec
        ]

        from processing.features.preview import preview

        preview()

    if not no_ffmpeg:
        print(
            '... generating wav extracts, use --no-ffmpeg to skip in case of '
            'error'
        )
        output_path = pathlib.Path(cfg.variables['generated_base']).joinpath(
            'preview-audio', 'normal.wav'
        )
        output_path.parent.mkdir(parents=True, exist_ok=True)
        subprocess.call(
            ['ffmpeg', '-loglevel', 'error', '-ss', start_sec, '-t', dur_sec,
             '-i', input_path, output_path]
        )
        output_path = pathlib.Path(cfg.variables['generated_base']).joinpath(
            'preview-audio', 'hzdiv10.wav'
        )
        subprocess.call(
            ['ffmpeg', '-loglevel', 'error', '-ss', start_sec, '-t', dur_sec,
             '-i', input_path, '-af',
             f'asetrate={expected_sr}*.1,aresample={expected_sr},atempo=1/.1',
             output_path]
        )


@extract.command()
@click.option('--force/--no-force', '-f', default=False)
@click.option('--skip-existing/--no-skip-existing', '-s', default=False)
def all(force: bool, skip_existing: bool) -> None:
    config = Config().get()

    todo = 0
    total = 0
    done = 0

    for act in ["count", "do"]:
        for esr, band, spec, fname, info, input_path, output_path in \
                iterate_audio_files_with_bands(
                    config,
                    ['@feature_base', '.pklz'],
                ):
            if act == "count":
                total += 1
            if output_path.exists() and not force:
                if skip_existing:
                    print(f'... skipping {output_path}')
                    continue
                raise Exception(
                    f'"{output_path}" exists (-s to skip existing, or -f to '
                    f'overwrite).'
                )
            if act == "count":
                todo += 1
            else:
                done += 1
                # own_call(['extract-features', input_path, output_path,
                # spec, esr])
                import sys
                sys.argv = ['extract_features.py', input_path, output_path,
                            spec, esr]
                print(f'Processing {input_path} ({done}/{todo}/{total})')

                from processing.features.go import go

                go()


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
