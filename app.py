import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load your trained model
model = tf.keras.models.load_model('TerrainRecognitionModel.h5')

# Define class mapping
class_mapping = {
    0: 'Grassy',
    1: 'Marshy',
    2: 'Rocky',
    3: 'Sandy'
}

def preprocess_image(image):
    # Resize the image to 64x64 pixels
    image = image.resize((64, 64))
    
    # Convert the image to a NumPy array
    image_array = np.array(image)
    
    # Normalize pixel values to [0, 1]
    image_array = image_array / 255.0
    
    # Expand dimensions to match model input shape
    image_array = np.expand_dims(image_array, axis=0)
    
    return image_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        try:
            # Read and preprocess the image
            image = Image.open(file)
            preprocessed_image = preprocess_image(image)
            
            # Make a prediction
            prediction_number = np.argmax(model.predict(preprocessed_image))
            predicted_class = class_mapping[prediction_number]
            
            return jsonify({'class': predicted_class})
        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
