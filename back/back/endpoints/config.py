from back import app
from back.constants import BASEPATH
from back.utils import read_json_file


@app.route("/config", methods=["GET"])
def get_config():
    path = f'{BASEPATH}/generated/ghost-config.json'
    return read_json_file(path)
