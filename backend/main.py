from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np

# Load the trained model
with open('hhmodel.pkl', 'rb') as file:
    model = pickle.load(file)

# Define the customized ranges for each feature based on dataset statistics
custom_ranges = {
    'engine_rpm': (61.0, 2239.0),
    'lub_oil_pressure': (0.003384, 7.265566),
    'fuel_pressure': (0.003187, 21.138326),
    'coolant_pressure': (0.002483, 7.478505),
    'lub_oil_temp': (71.321974, 89.580796),
    'coolant_temp': (61.673325, 195.527912),
    'temp_difference': (-22.669427, 119.008526)
}

# Feature Descriptions
feature_descriptions = {
    'engine_rpm': 'Revolution per minute of the engine.',
    'lub_oil_pressure': 'Pressure of the lubricating oil.',
    'fuel_pressure': 'Pressure of the fuel.',
    'coolant_pressure': 'Pressure of the coolant.',
    'lub_oil_temp': 'Temperature of the lubricating oil.',
    'coolant_temp': 'Temperature of the coolant.',
    'temp_difference': 'Temperature difference between components.'
}

# Create a FastAPI instance
app = FastAPI()

# Request model for input validation
class PredictionRequest(BaseModel):
    engine_rpm: float
    lub_oil_pressure: float
    fuel_pressure: float
    coolant_pressure: float
    lub_oil_temp: float
    coolant_temp: float
    temp_difference: float

# Function to predict engine condition
def predict_condition(data: PredictionRequest):
    input_data = np.array([
        data.engine_rpm, data.lub_oil_pressure, data.fuel_pressure, 
        data.coolant_pressure, data.lub_oil_temp, data.coolant_temp, 
        data.temp_difference
    ]).reshape(1, -1)
    prediction = model.predict(input_data)
    confidence = model.predict_proba(input_data)[:, 1]  # For binary classification, adjust as needed
    return prediction[0], confidence[0]

@app.post("/predict")
def predict(request: PredictionRequest):
    # Validate input ranges
    for feature, value in request.dict().items():
        min_val, max_val = custom_ranges[feature]
        if not (min_val <= value <= max_val):
            raise HTTPException(status_code=400, detail=f"{feature} out of range ({min_val} - {max_val})")
    
    result, confidence = predict_condition(request)
    return {"result": int(result), "confidence": float(confidence)}

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
