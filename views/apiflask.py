# server.py
from flask import Flask, request, jsonify
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = Flask(__name__)

# Load fine-tuned BioBERT model and tokenizer

model_path = "./src/fine-tuned/biobert/"
tokenizer_path = "monologg/biobert_v1.1_pubmed"
model = BertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizer.from_pretrained(tokenizer_path)

@app.route('/predict_department', methods=['POST'])
def predict_department():
    data = request.get_json()
    patient_query = data['patient_query']

    # Tokenize input
    inputs = tokenizer(patient_query, return_tensors="pt")

    # Perform inference
    outputs = model(**inputs)
    logits = outputs.logits

    # Get predicted department (assuming classification task)
    predicted_class = torch.argmax(logits, dim=1).item()

    return jsonify({'predicted_department': predicted_class})

if __name__ == '__main__':
    app.run(port=5000)
