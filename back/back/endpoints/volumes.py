from os.path import exists

from flask import Response, jsonify

from back import app
from back.constants import BASE_PATH
from back.utils.get_error_response import get_error_response
from back.utils.read_json_file import read_json_file
from back.utils.read_png_file import read_png_file


@app.route("/volumes/<string:interval>/<string:band>")
def get_unique_volumes(interval: str, band: str) -> Response:
    path = f'{BASE_PATH}/generated/single/volume/{interval}/{band}.json'

    if not exists(path):
        return get_error_response()

    json = read_json_file(path)

    return jsonify(json)


@app.route("/volumes/<string:interval>/<string:band>/<string:variable>")
def get_unique_volumes_image(
        interval: str,
        band: str,
        variable: str
) -> Response:
    path = f'{BASE_PATH}/generated/single/volume/{interval}/{band}.{variable}.png'

    if not exists(path):
        return get_error_response()

    return read_png_file(path)
