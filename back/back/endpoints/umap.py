from os.path import exists

from back import app
from back.constants import BASEPATH
from back.utils import get_error_response, read_json_file, read_png_file


@app.route("/umap/<string:interval>/<string:band>")
def get_umap(interval, band):
    path = f'{BASEPATH}/generated/umap/{interval}/{band}.json'

    if not exists(path):
        return get_error_response()

    return read_json_file(path)


@app.route("/umap/<string:interval>/<string:band>/image")
def get_umap_image(interval, band):
    path = f'{BASEPATH}/generated/umap/{interval}/{band}.png'

    if not exists(path):
        return get_error_response()

    return read_png_file(path)
