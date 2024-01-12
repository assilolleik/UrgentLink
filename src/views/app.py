from flask import Flask, request, jsonify
from flask_cors import CORS
from classify import classify_content

app = Flask(__name__)
CORS(app, resources={r"/classify": {"origins": "http://localhost:3000"}})

@app.route('/classify', methods=['POST'])
def classify_route():
    # Handle the classification logic based on the received data
    data = request.get_json()
    content = data.get('content', '')

    # Use the classify_content function from classify.py
    result = classify_content(content)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
