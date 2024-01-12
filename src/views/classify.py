from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoConfig, pipeline

# Specify the path to the directory containing the model files
model_path = "C:/Users/96181/Desktop/urgentlink/model/checkpoint-1015"

# Load the model configuration
config = AutoConfig.from_pretrained(model_path)

# Load the model weights
model = AutoModelForSequenceClassification.from_pretrained(model_path, config=config)

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=False)
classify = pipeline(task='text-classification', model=model, tokenizer=tokenizer)

def classify_content(content):
    # Your actual classification logic goes here
    # Replace this placeholder with your model inference code
    result = classify(content)
    return result[0]['label']  # Assuming 'label' contains the classification result

# For testing the function
if __name__ == '__main__':
    input_text = "Your test input here."
    result = classify_content(input_text)
    print(result)
