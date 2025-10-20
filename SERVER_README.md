# Backend Server Documentation

## Overview
This project now includes a backend Express server that provides mock data via API endpoints for the data visualization charts on the Media page.

## Running the Application

### Option 1: Run Server and Client Together (Recommended)
```bash
npm start
```
This will start both the Express backend server (port 3001) and the Vite dev server (port 5173) concurrently.

### Option 2: Run Separately

**Terminal 1 - Backend Server:**
```bash
npm run server
```
Server will run on http://localhost:3001

**Terminal 2 - Frontend Client:**
```bash
npm run dev
```
Client will run on http://localhost:5173

## API Endpoints

### Chart Data Endpoints

#### Get Available Time Steps
```
GET /api/timesteps
```
Returns: Array of available time steps (e.g., ["Q1", "Q2", "Q3", "Q4"])

#### Get Data for Specific Time Step
```
GET /api/data/:timeStep
```
Parameters:
- `timeStep`: One of Q1, Q2, Q3, or Q4

Returns: Object containing:
- `barData`: Array of objects with sales and revenue data for products
- `pieData`: Array of objects with category distribution data

Example:
```bash
curl http://localhost:3001/api/data/Q1
```

### Course Data Endpoints

#### Get All Course Data
```
GET /api/courses
```
Returns: Complete processed course data including subjects, course details, and metadata.

#### Get Subject Summaries
```
GET /api/courses/subjects
```
Returns: Subject-level summaries with enrollment statistics.

Example:
```bash
curl http://localhost:3001/api/courses/subjects
```

#### Get Specific Subject Details
```
GET /api/courses/subjects/:subject
```
Parameters:
- `subject`: Subject code (e.g., CMPS, INFS)

Returns: Summary and detailed course information for the specified subject.

Example:
```bash
curl http://localhost:3001/api/courses/subjects/CMPS
```

#### Get Specific Course Details
```
GET /api/courses/:subject/:courseNumber
```
Parameters:
- `subject`: Subject code (e.g., CMPS)
- `courseNumber`: Course number (e.g., 280)

Returns: All sections of the specified course.

Example:
```bash
curl http://localhost:3001/api/courses/CMPS/280
```

**Note:** Course data endpoints require preprocessed data. Run `npm run preprocess` first to generate the data from XLSX files. See [PREPROCESSING_README.md](./PREPROCESSING_README.md) for details.

## Features

### Media Page Charts
The Media page now displays:
- **Time Step Selector**: Buttons to select between Q1, Q2, Q3, and Q4
- **Bar Chart**: Shows sales and revenue by product for the selected time period
- **Pie Chart**: Shows category distribution for the selected time period

### Technology Stack
- **Backend**: Express.js with CORS support
- **Frontend**: React with Recharts for data visualization
- **Proxy**: Vite proxy configuration routes `/api` requests to the backend server

## Development Notes
- The Vite dev server proxies API requests to the Express server automatically
- Charts update dynamically when selecting different time steps
- Mock data is defined in `server.js` and represents quarterly business metrics
