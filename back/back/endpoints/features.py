from flask import jsonify

from back import app
from back.constants import PAYLOAD_ERROR
from back.utils.read_config import read_config
from back.utils.read_features import read_features


@app.route(
    "/features/<string:band>/<string:range>/<string:site>/<int:time>"
)
def get_features(band, range, site, time):
    config = read_config()

    try:
        my_band = config['bands'][band]
        my_range = config['ranges'][range]
        my_site = config['files'][site]
    except KeyError:
        return jsonify(PAYLOAD_ERROR)

    features = read_features(
        band,
        my_range,
        site,
        time,
    )

    return jsonify(features)
