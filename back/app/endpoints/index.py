from app import app


@app.route("/")
def get_index():
    return 'Sound Scape Explorer'
