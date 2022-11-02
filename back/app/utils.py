import json
from app.constants import ERROR_NOT_FOUND
from flask import send_file, jsonify


def get_error_response():
    return ERROR_NOT_FOUND, 404


def read_json_file(path):
    with open(path, "r") as f:
        content = json.load(f)
        return jsonify(content)


def read_png_file(path):
    return send_file(path, mimetype='image/png')
