import pathlib

from processing.deprecated_utils.get_name_and_extension_from_filepath import \
    get_name_and_extension_from_filepath


def iterate_audio_files(cfg, prefix, *more):
    suffix = cfg.variables['audio_suffix']

    for filepath, info in cfg.files.items():
        name, extension = get_name_and_extension_from_filepath(filepath)

        input_path = pathlib \
            .Path(cfg.variables['audio_base']) \
            .joinpath(name + extension)

        res = [name, info, input_path]

        for path, ext in more:
            p = pathlib.Path(
                cfg.variables[path[1:]] if path.startswith('@') else path
            )

            path = p.joinpath(prefix, name + extension + suffix).with_suffix(
                ext
            )

            res.append(path)

        yield res
