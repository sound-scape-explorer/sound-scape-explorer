from back import app


@app.route("/")
def get_index() -> str:
    return 'Sound Scape Explorer'
