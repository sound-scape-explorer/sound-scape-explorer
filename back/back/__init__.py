from flask import Flask
from flask_cors import CORS

app: Flask = Flask(__name__)
CORS(app)

from back.endpoints import (
    index,
    config,
    covering,
    volumes,
    umap,
    features,
)
