from flask import Flask
from flask_cors import CORS
from src.app.routes import api

def main() -> Flask:
    app = Flask('Triplan AI')

    # Enable CORS for all routes
    CORS(app)

    app.register_blueprint(api, url_prefix="/api")

    return app

def run():
    app = main()
    app.run(port=4001, debug=True)

if __name__ == "__main__":
    run()