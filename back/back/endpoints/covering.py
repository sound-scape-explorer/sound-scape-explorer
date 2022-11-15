from os.path import exists

from back import app
from back.constants import BASEPATH
from back.utils import get_error_response, read_png_file


@app.route("/covering/<string:interval>/<string:band>")
def get_covering_with_interval_and_band(interval, band):
    path = f'{BASEPATH}/generated/pairwise/covering/{interval}/{band}.meandist.png'

    if not exists(path):
        return get_error_response()

    return read_png_file(path)
