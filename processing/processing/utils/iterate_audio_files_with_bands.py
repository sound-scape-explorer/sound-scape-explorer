from processing.utils.iterate_audio_files import iterate_audio_files


def iterate_audio_files_with_bands(cfg, *more):
    esr = cfg.variables['audio_expected_sample_rate']
    for band, spec in cfg.bands.items():
        for r in iterate_audio_files(cfg, band, *more):
            yield [esr, band, spec] + r
