from os.path import exists

from flask import Response

from back import app
from back.constants import BASE_PATH
from back.utils.get_error_response import get_error_response
from back.utils.read_png_file import read_png_file


@app.route("/covering/<string:interval>/<string:band>")
def get_covering_with_interval_and_band(interval: str, band: str) -> Response:
    path = f'{BASE_PATH}/generated/pairwise/covering/{interval}/{band}.meandist.png'

    if not exists(path):
        return get_error_response()

    return read_png_file(path)
