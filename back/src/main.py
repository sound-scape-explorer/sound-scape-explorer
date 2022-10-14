import json

from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    payload = {
        "message": "This is a placeholder",
        "success": True,
    }

    return json.dumps(payload)
