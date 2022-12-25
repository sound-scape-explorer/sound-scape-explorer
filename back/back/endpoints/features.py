from os.path import exists

from flask import Response, jsonify

from back import app
from back.constants import BASE_PATH
from back.utils.get_error_response import get_error_response
from back.utils.read_json_file import read_json_file


@app.route(
    "/features/<string:interval>/<string:band>/<string:my_range>/<string:site>"
)
def get_features(
        interval: str,
        band: str,
        my_range: str,
        site: str,
) -> Response:
    path = f'{BASE_PATH}/generated/features/{interval}/{band}.json'

    if not exists(path):
        return get_error_response()

    json = read_json_file(path)

    try:
        payload = json['data'][f'{my_range} {site}']
        return jsonify(payload)
    except IndexError:
        return get_error_response()


@app.route(
    "/features/<string:interval>/<string:band>/<string:my_range>/<string:site>/<string:timestamp>"
)
def get_features_by_timestamp(
        interval: str, band: str, my_range: str,
        site: str,
        timestamp: str
) -> Response:
    path = f'{BASE_PATH}/generated/features/{interval}/{band}.json'

    if not exists(path):
        return get_error_response()

    json = read_json_file(path)

    try:
        payload = json['data'][f'{my_range} {site}']
        index = payload['t'].index(int(timestamp))
        return jsonify(payload['features'][index])
    except IndexError:
        return get_error_response()
