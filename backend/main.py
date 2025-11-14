'''from flask import Flask, jsonify, request #frontend
from flask_cors import CORS
import requests #api

app = Flask(__name__)
CORS(app)

api_key = 'a566764b6c164abdb4f131452251110'

@app.route('/weather', methods=["POST"])
def api():
    if request.method == "POST":
        city = request.get_json()
        if city and "city" in city:
            response = requests.get(f'https://api.weatherapi.com/v1/current.json?key={api_key}&q={city["city"]}')
            if response.status_code == 200:
                return jsonify(response.json())
            else:
                return jsonify("Invalid data"), 400
        else:
            return jsonify("Invalid request"), 400
    return jsonify("Flask backend is running!")'''
'''@app.route('/weather', methods=["GET"])
def api():
    # ✅ GET parameter (from URL)
    city = request.args.get("city")

    if city:
        # call external weather API
        response = requests.get(
            f'https://api.weatherapi.com/v1/current.json?key={api_key}&q={city}'
        )
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"error": "Invalid city or API error"}), 400
    else:
        return jsonify({"error": "City parameter is missing"}), 400

if __name__ == "__main__":
    app.run(debug=True)'''
    
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

api_key = 'a566764b6c164abdb4f131452251110'

@app.route("/cities", methods=["POST"])
def get_cities():
    country = request.get_json().get("country")
    if not country:
        return jsonify({"error": "Country name is required"}), 400

    res = requests.post("https://countriesnow.space/api/v0.1/countries/cities",
                        json={"country": country})
    if res.status_code == 200:
        return jsonify(res.json())
    else:
        return jsonify({"error": "Unable to fetch cities"}), 500



@app.route("/weather", methods=["POST"])
def get_weather():
    city = request.get_json().get("city")
    if not city:
        return jsonify({"error": "City name is required"}), 400

    res = requests.get(
        f"https://api.weatherapi.com/v1/current.json?key={api_key}&q={city}")
    if res.status_code == 200:
        return jsonify(res.json())
    else:
        return jsonify({"error": "Unable to fetch weather"}), 500

if __name__ == "__main__":
    app.run(debug=True)
