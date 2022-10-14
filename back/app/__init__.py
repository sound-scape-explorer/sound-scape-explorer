from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from app.endpoints import index, config, covering, volumes, umap
