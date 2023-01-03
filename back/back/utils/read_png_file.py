from flask import Response, send_file


def read_png_file(path: str) -> Response:
    return send_file(path, mimetype='image/png')
