import datetime
import pprint
from json import dumps

import click
import numpy

from processing.cli import cli
from processing.utils.config.get_config import get_config
from processing.utils.get_audio_duration import get_audio_duration
from processing.utils.iterate_audio_files_with_bands import \
    iterate_audio_files_with_bands


@cli.group()
def show():
    pass


@show.command()
@click.option('--json/--dict', default=False)
def config(json):
    cfg = get_config()

    if not json:
        pprint.pprint(cfg._asdict())
        return

    print(dumps(cfg._asdict(), default=lambda
        o: o.isoformat()))  #  might need a more complex method if we push the idea of parsing the config even further


@show.command()
@click.option('--duration', '--dur', '-d', default=-1)
@click.option('--no-print/--print', default=False)
@click.option('--aggregate/--per-site', default=False)
def audio_span_plot(duration, no_print, aggregate):
    from matplotlib import pyplot as plt

    per_site = not aggregate
    config = get_config()
    ntot = sum(1 for _ in iterate_audio_files_with_bands(config))
    events = []

    if per_site:
        sites = sorted(list(
            set(o[4].site for o in
                iterate_audio_files_with_bands(config))))
        print(sites)
        events = {s: [] for s in sites}

    i = 0

    for esr, band, spec, fname, info, input_path in iterate_audio_files_with_bands(
            config):
        dur = duration if duration > 0 else get_audio_duration(
            input_path)
        start = info.start
        end = info.start + datetime.timedelta(seconds=dur)
        if not no_print:
            print(f'... {fname} from {start} {dur:.3f}')
        into = events
        if per_site:
            into = events[info.site]
        into.append([start, 0])
        into.append([start, +1])
        into.append([end, 0])
        into.append([end, -1])
        plt.plot([start, end], [-i / ntot, -i / ntot])
        i += 1

    if per_site:
        base = 0
        for s in sites:
            data = numpy.array(sorted(events[s], key=lambda p: p[0]))
            if data.size == 0:
                continue
            csum = numpy.cumsum(data[:, 1])
            plt.plot(data[:, 0], base + csum)
            base += numpy.max(csum) + 0.05
    else:
        events = sorted(events, key=lambda p: p[0])
        data = numpy.array(events)
        plt.plot(data[:, 0], numpy.cumsum(data[:, 1]))
    plt.show()


@show.command()
def list_sites():
    cfg = get_config()
    sites = set()
    for o in iterate_audio_files_with_bands(cfg):
        sites.add(o[4].site)
    for i in sorted(list(sites)):
        print(i)
    print(sorted(list(sites)))
    print(",".join(sorted(list(sites))))
