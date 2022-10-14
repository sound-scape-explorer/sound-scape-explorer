from app import app
from app.constants import BASEPATH
from app.utils import read_json_file


@app.route("/config", methods=["GET"])
def get_config():
    path = f'{BASEPATH}/generated/ghost-config.json'
    return read_json_file(path)
