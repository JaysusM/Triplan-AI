from flask import Blueprint, request, jsonify
from src.app.utils.ai.llama import generate_response  # Import the generate_response method
import re

trip = Blueprint('trip', __name__)

@trip.route('/getPlacesAndActivitiesSuggestionsByCity', methods=['GET'])
def get_places_and_activities_suggestions_by_city():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    user_message = f"Please provide a list of up to 15 places and activities to do in {city}. No duplicates in the list. Be concise and only provide the list. If you don't know any places, return some places close to its location <100km or an empty list if necessary. Format the response as follows: 1. Place 1\n2. Place 2\n3. Place 3"

    try:
        response = generate_response(user_message)
        suggestions = parse_suggestions(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"city": city, "suggestions": suggestions})

def parse_suggestions(response):
    """
    Parses the response to extract the list of suggestions.
    Assumes the response is a plain text list with numbered items.
    """
    response = response.split('[/INST]')[0]
    response = response.replace('[/SYS]', '')
    # Use regular expressions to find all numbered list items
    suggestions = re.findall(r'\d+\.\s*(.*)', response)
    return suggestions