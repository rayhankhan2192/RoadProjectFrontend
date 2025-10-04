# Road Damage Detection App

A modern React application for detecting and classifying road damage using AI. The app provides two main features:

## Features

### 1. Classification Page
- Upload road images to classify damage type
- Supports 3 damage classes: Crack, Pothole, and Surface Erosion
- Shows prediction confidence and lighting conditions
- Displays processed image results

### 2. Detection Page
- Comprehensive road damage analysis
- Detailed damage breakdown (potholes, cracks, surface erosion counts)
- Road condition assessment with scoring
- Professional assessment report generation
- Before/after image comparison

## API Endpoints

- **Classification**: `http://127.0.0.1:8000/api/predict-classification`
- **Detection**: `http://127.0.0.1:8000/api/detect_damage`

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Technologies Used

- React 19
- React Router DOM
- Vite
- Modern CSS with responsive design
- RESTful API integration

## Project Structure

```
src/
├── components/
│   ├── ClassificationPage.jsx    # Classification functionality
│   ├── ClassificationPage.css     # Classification styles
│   ├── DetectionPage.jsx          # Detection functionality
│   └── DetectionPage.css          # Detection styles
├── App.jsx                        # Main app with routing
├── App.css                        # Global app styles
├── index.css                      # Global styles
└── main.jsx                       # App entry point
```