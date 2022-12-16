from flask import send_file


def read_png_file(path):
    return send_file(path, mimetype='image/png')
