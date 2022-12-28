import pathlib

from processing.utils.get_name_from_filename import get_name_from_filename


def iterate_audio_files(cfg, prefix, *more):
    suffix = cfg.variables['audio_suffix']

    for filename, info in cfg.files.items():
        name = get_name_from_filename(filename)

        print(name)

        input_path = pathlib \
            .Path(cfg.variables['audio_base']) \
            .joinpath(name + suffix)

        res = [name, info, input_path]

        for path, ext in more:
            p = pathlib.Path(
                cfg.variables[path[1:]] if path.startswith('@') else path
            )

            res.append(p.joinpath(prefix, name + suffix).with_suffix(ext))

        yield res
