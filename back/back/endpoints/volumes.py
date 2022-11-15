from os.path import exists

from back import app
from back.constants import BASEPATH
from back.utils import get_error_response, read_json_file, read_png_file


@app.route("/volumes/<string:interval>/<string:band>")
def get_unique_volumes(interval, band):
    path = f'{BASEPATH}/generated/single/volume/{interval}/{band}.json'

    if not exists(path):
        return get_error_response()

    return read_json_file(path)


@app.route("/volumes/<string:interval>/<string:band>/<string:variable>")
def get_unique_volumes_image(interval, band, variable):
    path = f'{BASEPATH}/generated/single/volume/{interval}/{band}.{variable}.png'

    if not exists(path):
        return get_error_response()

    return read_png_file(path)
