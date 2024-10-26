from flask import Blueprint
from src.app.controllers.trip import trip

# main blueprint to be registered with application
api = Blueprint('api', __name__)

# register user with api blueprint
api.register_blueprint(trip, url_prefix="/trip")