from os.path import exists

from flask import jsonify

from back import app
from back.constants import BASEPATH
from back.utils.get_error_response import get_error_response
from back.utils.read_json_file import read_json_file


@app.route(
    "/features/<string:interval>/<string:band>/<string:my_range>/<string:site>"
)
def get_features(interval, band, my_range, site):
    path = f'{BASEPATH}/generated/features/{interval}/{band}.json'

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
def get_features_by_timestamp(interval, band, my_range, site, timestamp):
    path = f'{BASEPATH}/generated/features/{interval}/{band}.json'

    if not exists(path):
        return get_error_response()

    json = read_json_file(path)

    try:
        payload = json['data'][f'{my_range} {site}']
        index = payload['t'].index(int(timestamp))
        return jsonify(payload['features'][index])
    except IndexError:
        return get_error_response()
