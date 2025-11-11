# 🚀 Safe Route Detection - Complete Setup Guide

This guide will help you set up the complete Safe Route Detection system, including both the Python backend and React Native frontend.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Setup (Python Flask)](#backend-setup-python-flask)
3. [Frontend Setup (React Native Expo)](#frontend-setup-react-native-expo)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### For Backend:
- Python 3.8 or higher
- pip (Python package manager)
- Crime data CSV file (see [Crime Data Format](#crime-data-format))

### For Frontend:
- Node.js 16+ and npm
- Expo CLI (installed globally or via npx)
- React Native development environment set up

## Backend Setup (Python Flask)

### Step 1: Navigate to Backend Directory
```bash
cd python-backend
```

### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

**Note:** Installing OSMnx and its dependencies may take several minutes.

### Step 4: Prepare Crime Data

1. Create a `data` directory in `python-backend/`:
   ```bash
   mkdir data
   ```

2. Place your crime data CSV file in `python-backend/data/crime_weighted_output.csv`

   **Required CSV Columns:**
   - `OFFENSE_LATITUDE`: Latitude of crime incidents
   - `OFFENSE_LONGITUDE`: Longitude of crime incidents
   - At least one column with "score" in the name (e.g., `crime_score`, `weighted_score`)

### Step 5: Start Backend Server
```bash
python app.py
```

The server will start on `http://localhost:8000`

**Important Notes:**
- The first request will take longer (30-60 seconds) as it downloads the city map
- Subsequent requests will be much faster
- Make note of your machine's IP address if testing on a physical device

## Frontend Setup (React Native Expo)

### Step 1: Navigate to Frontend Directory
```bash
cd btp-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

The `react-native-webview` package is already included in `package.json`.

### Step 3: Configure API URL

Open `btp-frontend/app/(tabs)/safe-route.tsx` and update the API URL:

```typescript
// For local development (same machine)
const API_BASE_URL = 'http://localhost:8000';

// For physical device testing (replace with your machine's IP)
const API_BASE_URL = 'http://192.168.1.100:8000';

// For ngrok/public server
const API_BASE_URL = 'https://your-ngrok-url.ngrok.io';
```

**Finding Your IP Address:**
- **Windows:** Run `ipconfig` in Command Prompt, look for IPv4 Address
- **macOS/Linux:** Run `ifconfig` or `ip addr`, look for inet address

### Step 4: Start Expo Development Server
```bash
npm run dev
# or
npx expo start
```

## Configuration

### Backend Configuration

Edit `python-backend/app.py`:

```python
# Change city name
CITY_NAME = "Washington, DC"  # Change to your city

# Change crime data path
CRIME_DATA_PATH = "data/crime_weighted_output.csv"

# Change port (default: 8000)
app.run(host='0.0.0.0', port=8000, debug=True)
```

### Frontend Configuration

The safe route screen is already added to the tab navigation. No additional configuration needed unless you want to customize the UI.

## Running the Application

### 1. Start Backend Server
```bash
cd python-backend
python app.py
```

Wait for the message: `🌸 Starting Safe Route Detection API...`

### 2. Start Frontend (in a new terminal)
```bash
cd btp-frontend
npx expo start
```

### 3. Test the Application

1. Open the Expo app on your device/simulator
2. Navigate to the "Safe Route" tab
3. Enter source and destination locations
4. Tap "Find Safe Route"
5. Wait for the map to load (first request may take 30-60 seconds)

## Testing with ngrok (For Remote Access)

If you want to test on a physical device without being on the same network:

### Step 1: Install ngrok
```bash
# Download from https://ngrok.com/download
# or via npm
npm install -g ngrok
```

### Step 2: Start Backend
```bash
cd python-backend
python app.py
```

### Step 3: Start ngrok Tunnel
```bash
ngrok http 8000
```

### Step 4: Update Frontend API URL
Use the ngrok HTTPS URL (e.g., `https://abc123.ngrok.io`)

```typescript
const API_BASE_URL = 'https://abc123.ngrok.io';
```

## Troubleshooting

### Backend Issues

#### "Crime data file not found"
- **Solution:** Ensure `crime_weighted_output.csv` exists in `python-backend/data/`
- Check the file path in `app.py`

#### "No crime score column found"
- **Solution:** Ensure your CSV has a column with "score" in its name
- Example: `crime_score`, `weighted_score`, `risk_score`

#### "Module not found" errors
- **Solution:** Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

#### OSMnx download fails
- **Solution:** Check internet connection
- Try a smaller city area or different city name
- OSMnx downloads can be slow depending on city size

### Frontend Issues

#### "Failed to connect to server"
- **Solution:** 
  - Check if backend is running
  - Verify API_BASE_URL is correct
  - For physical devices, use your machine's IP address instead of `localhost`
  - Ensure firewall allows connections on port 8000

#### WebView doesn't load map
- **Solution:**
  - Check backend logs for errors
  - Verify map URL is accessible in browser
  - Check CORS settings in Flask (should be enabled)

#### "Location not found" error
- **Solution:** Use more specific location names
- Include city, state, country: "Anacostia, Washington, DC" # 🌸 Safe Route Detection 

Flask-based REST API for real-time safe route detection using crime data, OSMnx, and NetworkX.

## Features

- 🛡️ **Safest Route**: Minimizes crime exposure while considering distance
- ⚡ **Fastest Route**: Shortest distance path
- ⚠️ **Unsafe Route**: Route through high-crime areas (for comparison)
- 🗺️ **Interactive Maps**: Folium-generated HTML maps with heatmaps and route visualization
- 📊 **Crime Heatmap**: Visual representation of crime hotspots

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Crime data CSV file with the following columns:
  - `OFFENSE_LATITUDE`
  - `OFFENSE_LONGITUDE`
  - At least one column with "score" in the name (for crime scoring)

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd python-backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Prepare crime data:**
   - Place your crime data CSV file in the `data/` directory
   - Ensure it's named `crime_weighted_output.csv` (or update `CRIME_DATA_PATH` in `app.py`)
   - The CSV should contain:
     - `OFFENSE_LATITUDE`: Latitude of crime incidents
     - `OFFENSE_LONGITUDE`: Longitude of crime incidents
     - At least one column with "score" in the name (e.g., `crime_score`, `weighted_score`)

## Configuration

Edit `app.py` to configure:

- `CRIME_DATA_PATH`: Path to your crime data CSV file (default: `"data/crime_weighted_output.csv"`)
- `CITY_NAME`: City name for OSMnx map download (default: `"Washington, DC"`)
- `MAPS_DIR`: Directory to store generated map HTML files (default: `"maps"`)

## Running the Server

1. **Start the Flask server:**
   ```bash
   python app.py
   ```

2. **The server will start on:**
   - Default: `http://0.0.0.0:8000`
   - Local access: `http://localhost:8000`

3. **Note:** The first request will take longer as it needs to:
   - Download the city map graph from OpenStreetMap
   - Load and process crime data
   - Map crimes to road edges

## API Endpoints

### 1. Health Check
```
GET /health
```
Returns server health status.

**Response:**
```json
{
  "status": "healthy",
  "service": "Safe Route API"
}
```

### 2. Get Safe Route
```
POST /getSafeRoute
```

**Request Body:**
```json
{
  "source": "near **Anacostia / southeast Washington, DC",
  "destination": "Washington, DC"
}
```

**Success Response:**
```json
{
  "status": "success",
  "safe_path_distance_km": 12.4,
  "crime_score": 0.18,
  "map_url": "http://localhost:8000/maps/safe_route_abc123.html",
  "map_filename": "safe_route_abc123.html"
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Error description here"
}
```

### 3. Serve Map
```
GET /maps/<filename>
```
Serves generated map HTML files.

## Usage Example

### Using curl:
```bash
curl -X POST http://localhost:8000/getSafeRoute \
  -H "Content-Type: application/json" \
  -d '{
    "source": "near **Anacostia / southeast Washington, DC",
    "destination": "Washington, DC"
  }'
```

### Using Python requests:
```python
import requests

response = requests.post(
    "http://localhost:8000/getSafeRoute",
    json={
        "source": "near **Anacostia / southeast Washington, DC",
        "destination": "Washington, DC"
    }
)

data = response.json()
print(data["map_url"])
```

## Troubleshooting

### Issue: "Crime data file not found"
- **Solution:** Ensure the crime data CSV file exists in the `data/` directory
- Check the file path in `app.py` (`CRIME_DATA_PATH`)

### Issue: "No crime score column found"
- **Solution:** Ensure your CSV has at least one column with "score" in its name
- Example column names: `crime_score`, `weighted_score`, `risk_score`

### Issue: "Could not geocode location"
- **Solution:** Use more specific location names (include city, state, country)
- Example: "near **Anacostia / southeast Washington, DC" instead of "Anacostia"

### Issue: "No route found between locations"
- **Solution:** Ensure both locations are within the city boundaries specified in `CITY_NAME`
- The locations must be accessible by road network

### Issue: Slow first request
- **This is normal!** The first request downloads the city map and processes crime data
- Subsequent requests will be much faster as data is cached

## Development

### Project Structure
```
python-backend/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── README.md          # This file
├── data/              # Crime data CSV files
│   └── crime_weighted_output.csv
└── maps/              # Generated map HTML files (created automatically)
```

### Adding New Cities

To use a different city:

1. Update `CITY_NAME` in `app.py`:
   ```python
   CITY_NAME = "Mumbai, India"
   ```

2. Ensure your crime data covers the new city area

3. Restart the server (map graph will be downloaded on first request)

## License

This project is part of the BTP (B.Tech Project) Safe Route Detection System.


"

#### Slow loading
- **First request is always slow** (downloads map data)
- Subsequent requests should be faster
- Large cities take longer to process

### Network Issues

#### Can't connect from physical device
- **Solution:**
  1. Ensure device and computer are on the same Wi-Fi network
  2. Use your computer's IP address (not `localhost`)
  3. Check firewall settings
  4. Consider using ngrok for remote access

#### CORS errors
- **Solution:** Flask-CORS is already configured in `app.py`
- If issues persist, check CORS settings

## Crime Data Format

Your crime data CSV should have the following structure:

```csv
OFFENSE_LATITUDE,OFFENSE_LONGITUDE,crime_score,OTHER_COLUMNS...
28.6139,77.2090,0.85,...
28.7041,77.1025,0.72,...
...
```

**Required:**
- `OFFENSE_LATITUDE`: Decimal latitude
- `OFFENSE_LONGITUDE`: Decimal longitude
- One column with "score" in the name (for crime weighting)

**Optional:**
- Any other columns you want to include (will be ignored by the system)

## API Usage Examples

### Test Backend Directly

```bash
# Health check
curl http://localhost:8000/health

# Get safe route
curl -X POST http://localhost:8000/getSafeRoute \
  -H "Content-Type: application/json" \
  -d '{
    "source": "Connaught Place, Delhi",
    "destination": "AIIMS, Delhi"
  }'
```

### Expected Response

```json
{
  "status": "success",
  "safe_path_distance_km": 12.4,
  "crime_score": 0.18,
  "map_url": "http://localhost:8000/maps/safe_route_abc123.html",
  "map_filename": "safe_route_abc123.html"
}
```

## Project Structure

```
safeshe-main/
├── python-backend/
│   ├── app.py                    # Flask application
│   ├── requirements.txt          # Python dependencies
│   ├── README.md                # Backend documentation
│   ├── data/                    # Crime data CSV files
│   │   └── crime_weighted_output.csv
│   └── maps/                    # Generated map HTML files
│
├── btp-frontend/
│   ├── app/
│   │   └── (tabs)/
│   │       └── safe-route.tsx   # Safe route screen
│   └── package.json
│
└── SAFE_ROUTE_SETUP.md          # This file
```

## Next Steps

1. ✅ Backend is running and accessible
2. ✅ Frontend can connect to backend
3. ✅ Test with real locations
4. ✅ Customize city name and crime data
5. ✅ Deploy backend to cloud (optional)
6. ✅ Deploy frontend to app stores (optional)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs for errors
3. Check Expo/React Native logs
4. Verify all dependencies are installed correctly

## License

Part of the BTP (Bachelor's Thesis Project) Safe Route Detection System.

---

**Happy Coding! 🚀**

