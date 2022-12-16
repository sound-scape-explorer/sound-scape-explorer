import pathlib


def iterate_audio_files(cfg, prefix, *more):
    suffix = cfg.variables['audio_suffix']

    for fname, info in cfg.files.items():

        input_path = pathlib \
            .Path(cfg.variables['audio_base']) \
            .joinpath(fname + suffix)

        res = [fname, info, input_path]

        for path, ext in more:
            p = pathlib.Path(
                cfg.variables[path[1:]] if path.startswith('@') else path
            )

            res.append(p.joinpath(prefix, fname + suffix).with_suffix(ext))

        yield res
