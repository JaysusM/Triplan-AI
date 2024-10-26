from flask import Flask
from src.app.routes import api

def main() -> Flask:
    app = Flask('Triplan AI')

    app.register_blueprint(api, url_prefix="/api")

    return app

def run():
    app = main()
    app.run("localhost", 5000)

if __name__ == "__main__":
    run()