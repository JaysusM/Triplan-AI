import re
import json
from flask import Blueprint, request, jsonify
from src.app.utils.ai.llama import generate_response  # Import the generate_full_response method

trip = Blueprint('trip', __name__)

@trip.route('/getPlacesAndActivitiesSuggestionsByCity', methods=['GET'])
def get_places_and_activities_suggestions_by_city():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    try:
        user_message = (
            f"Please provide a JSON response with a list of up to 15 places and activities to do in {city}. "
            f"No duplicates in the list. Be concise and only provide the list. If you don't know any places, "
            f"return some places close to its location <100km or an empty list if necessary. "
            f"Format the response as a JSON object with a key 'suggestions' and an array of places and activities. "
            f"Example: {{'suggestions': ['Place 1', 'Place 2', 'Place 3']}}"
        )
        response = generate_response(user_message, max_tokens=512)
        suggestions = parse_suggestions(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"city": city, "suggestions": suggestions})

@trip.route('/getDailyPlanningsWithPlacesAndActivities', methods=['POST'])
def get_daily_plannings_with_places_and_activities():
    data = request.get_json()
    places_and_activities = data.get('placesAndActivities')
    number_of_days = data.get('numberOfDays')

    if not places_and_activities or not number_of_days:
        return jsonify({"error": "placesAndActivities and numberOfDays parameters are required"}), 400

    user_message = (
        f"Create a daily plan for {number_of_days} days with the following places and activities: {places_and_activities}. "
        f"Group nearby activities by time, include suggestions, and account for travel time. "
        f"Provide average time spent at each place. "
        f"Strictly use no more than the given days. "
        f"If not possible, return 'notPossible': true. "
        f"Format as JSON with 'dailyPlannings' key. "
        f"Example: {{'dailyPlannings': {{ 'notPossible': false, 'result': [{{'day': 1, 'activities': [{{'place': 'Place 1', 'averageTime': '2 hours'}}, {{'place': 'Place 2', 'averageTime': '1.5 hours'}}]}}, {{'day': 2, 'activities': [{{'place': 'Place 3', 'averageTime': '3 hours'}}, {{'place': 'Place 4', 'averageTime': '2 hours'}}]}}]}}}}"
    )

    # try:
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500
    response = generate_response(user_message, max_tokens=512)
    daily_plannings = parse_daily_plannings(response)

    return jsonify({"dailyPlannings": daily_plannings})

def parse_suggestions(response):
    """
    Parses the JSON response to extract the list of suggestions.
    Assumes the response is a JSON object with a key 'suggestions'.
    """
    try:
        # Extract the JSON part from the response text
        response = "".join(response.split("\n"))
        json_match = re.search(r'\{.*\}', response)
        if json_match:
            response_json = json.loads(json_match.group(0))
            return response_json.get('suggestions', [])
        else:
            raise ValueError("No valid JSON found in the response")
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON response")

def parse_daily_plannings(response):
    """
    Parses the JSON response to extract the daily plannings.
    Assumes the response is a JSON object with a key 'dailyPlannings'.
    """
    try:
        # Extract the JSON part from the response text
        response = "".join(response.split("\n"))
        print(response)
        json_match = re.search(r'\{.*\}', response)
        if json_match:
            response_json = json.loads(json_match.group(0))
            return response_json.get('dailyPlannings', [])
        else:
            raise ValueError("No valid JSON found in the response")
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON response")
