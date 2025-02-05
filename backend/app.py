from flask import Flask, request, jsonify
import os
from flask_cors import CORS, cross_origin 
app = Flask(__name__)
CORS(app)
import sys
from pytorch_model import get_prediction

# Ensure the uploads directory exists
uploads_dir = os.path.join(app.instance_path, 'uploads')
os.makedirs(uploads_dir, exist_ok=True)

@app.route('/', methods=['GET','POST'])
def upload_file():
    print("hello", file=sys.stderr)
    if 'file' not in request.files:
        print("No file part in the request.")
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        print("No file selected for uploading.")
        return 'No selected file', 400
    if file:
        # Save the file
        file_path = os.path.join(uploads_dir, file.filename)
        file.save(file_path)
        print(f"File {file.filename} saved to {file_path}.", file=sys.stderr)

        # Process the image and generate a label (mock function)
        label = get_prediction(file_path)
        print(f"Classified {file.filename} as {label}.")

        # Return the label
        return jsonify({'label': label})


def classify_image(image_path):
    # Mock classification logic
    label = "Example Label"  # Replace with actual classification logic
    print(f"Processing image at {image_path}, determined label: {label}.")
    return label

if __name__ == '__main__':
    app.run(debug=True)