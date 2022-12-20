from flask import send_file, Response


def read_png_file(path: str) -> Response:
    return send_file(path, mimetype='image/png')
