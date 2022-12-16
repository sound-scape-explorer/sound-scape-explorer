from flask import jsonify

from back import app
from back.utils.read_config import read_config


@app.route("/config", methods=["GET"])
def get_config():
    config = read_config()
    return jsonify(config)
