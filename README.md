# AMFI Portfolio Tracker

A simple web app to calculate mutual fund portfolio value using AMFI NAV data.

## What was fixed
- Added a Node/Express server so the app can be deployed on Railway.
- Added a backend API endpoint (`/api/nav`) that fetches AMFI data server-side.
- Updated frontend fetch to use `/api/nav`, which avoids browser CORS issues with direct AMFI requests.
- Added basic error handling and status messages in UI.

## Features
- Fetches latest NAV from AMFI
- Search mutual funds
- Select fund
- Enter units
- Calculate portfolio value instantly

## Data Source
- https://portal.amfiindia.com/spages/NAVAll.txt

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start server:
   ```bash
   npm start
   ```
3. Open:
   - http://localhost:3000

## Deploy on Railway
1. Push this repo to GitHub.
2. In Railway, create a **New Project** and choose **Deploy from GitHub repo**.
3. Select this repository.
4. Railway auto-detects Node and runs:
   - Install: `npm install`
   - Start: `npm start`
5. Once deployed, open the Railway-provided URL.

## Health Endpoint
- `GET /health` returns service status JSON.
