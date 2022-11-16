import sys
import time
import torchaudio

from processing.utils.parse_band import parse_band


def load_data():
    input_path = sys.argv[1]
    output_path = sys.argv[2]

    band_params = parse_band(sys.argv[3])  # e.g. 256-64
    expected_sample_rate = int(sys.argv[4])
    next_param = 5
    log = print

    if band_params[0] - band_params[1] < 64:
        raise Exception(
            f'Band parameters do not allow to extract 64 bins, i.e. {band_params[0]}-{band_params[1]}={band_params[0] - band_params[1]} < 64'
        )

    t_start = time.time()
    # log('Starting...')
    wav_data, sr = torchaudio.load(input_path)
    log(f'({time.time() - t_start:.3f} sec)... audio file loaded ({wav_data.shape}, rate {sr}, ~{wav_data.shape[1] / sr}sec)')

    if sr != expected_sample_rate:
        raise Exception(
            f'Expected sample rate of {expected_sample_rate} but got {sr}'
        )

    return input_path, output_path, band_params, log, t_start, wav_data, sr, next_param
