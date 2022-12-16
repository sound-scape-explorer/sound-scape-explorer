from datetime import datetime, timedelta

from back.constants import BASEPATH, PAYLOAD_ERROR
from back.utils.read_npz_file import read_npz_file


def read_features(band, my_range, site, time):
    path = f'{BASEPATH}/features/{band}/{site}.npz'

    npz = read_npz_file(path)['x']
    data = npz[1]

    duration = timedelta(seconds=0.92 * len(npz))
    range_start = datetime.fromisoformat(my_range[0]).timestamp()
    range_end = datetime.fromisoformat(my_range[1]).timestamp()

    if range_start > time + duration.total_seconds():
        return PAYLOAD_ERROR

    if range_end < time:
        return PAYLOAD_ERROR

    return {
        'success': True,
        'data': data.tolist(),
        'time': time,
        'range_start': range_start,
        'range_end': range_end,
        'duration': duration.total_seconds()
    }
