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

#### Get All CMPS Courses
```
GET /api/courses
```
Returns: Object containing:
- `metadata`: Processing metadata (timestamps, file names, totals)
- `courses`: Array of course objects with enrollment summary

Example response:
```json
{
  "metadata": {
    "generatedAt": "2025-10-20T14:22:48.907Z",
    "catalogFile": "catalog-2024-2025.xlsx",
    "offeringsFile": "cmps-offerings-spring-2025.xlsx",
    "totalCourses": 3,
    "totalSections": 4
  },
  "courses": [
    {
      "courseKey": "CMPS-160",
      "subject": "CMPS",
      "courseNumber": "160",
      "name": "Introduction to Computer Science",
      "creditHours": "3",
      "totalActualEnrollment": 83,
      "totalMaxEnrollment": 100,
      "availableSeats": 17,
      "enrollmentPercentage": "83.00",
      "numberOfSections": 2,
      "prerequisites": ["MATH-140"]
    }
  ]
}
```

Example:
```bash
curl http://localhost:3001/api/courses
```

#### Get Specific Course Details
```
GET /api/courses/:courseCode
```
Parameters:
- `courseCode`: Course code (e.g., CMPS-160, CMPS-280)

Returns: Complete course object including:
- Basic course information (name, description, credit hours)
- Enrollment data (actual, max, available, percentage)
- Prerequisites with recursive details
- All section details (CRN, instructor, schedule, location)

Example:
```bash
curl http://localhost:3001/api/courses/CMPS-280
```

Example response:
```json
{
  "courseKey": "CMPS-280",
  "subject": "CMPS",
  "courseNumber": "280",
  "name": "Data Structures",
  "description": "Study of data structures...",
  "totalActualEnrollment": 42,
  "totalMaxEnrollment": 45,
  "availableSeats": 3,
  "enrollmentPercentage": "93.33",
  "prerequisites": ["CMPS-160"],
  "prerequisiteDetails": [
    {
      "courseKey": "CMPS-160",
      "name": "Introduction to Computer Science",
      "description": "An introduction to...",
      "prerequisites": [
        {
          "courseKey": "MATH-140",
          "name": "College Algebra",
          "description": "Functions, graphs...",
          "prerequisites": []
        }
      ]
    }
  ],
  "sections": [...]
}
```

#### Get Enrollment Statistics
```
GET /api/courses/stats/enrollment
```
Returns: Aggregate statistics about course enrollments

Example response:
```json
{
  "totalCourses": 3,
  "totalSections": 4,
  "totalEnrollment": 153,
  "totalCapacity": 185,
  "averageUtilization": "82.70",
  "coursesWithHighEnrollment": 1,
  "coursesWithMediumEnrollment": 2,
  "coursesWithLowEnrollment": 0
}
```

Example:
```bash
curl http://localhost:3001/api/courses/stats/enrollment
```

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

## Course Data Processing

### Prerequisites

The course data endpoints require preprocessing of XLSX files containing:
1. **Academic Catalog** (`data/input/catalog-2024-2025.xlsx`)
2. **Course Offerings** (`data/input/cmps-offerings-spring-2025.xlsx`)

### Preprocessing

Before the course endpoints return real data, you must:

1. Place the XLSX files in `data/input/` with the exact filenames:
   - `catalog-2024-2025.xlsx` - Academic catalog with course descriptions, prerequisites, etc.
   - `cmps-offerings-spring-2025.xlsx` - Course offerings with enrollment data

2. Run the preprocessing script:
   ```bash
   npm run preprocess
   ```

This will:
- Read both XLSX files
- Parse course catalog data (descriptions, prerequisites, credit hours)
- Parse course offerings (enrollment, sections, schedules)
- Merge data and resolve prerequisites recursively
- Generate `data/output/courses.json`

### Expected XLSX Format

See `data/README.md` for detailed column specifications.

**Catalog columns include:**
- Prefix, Code, Name, Description
- Prerequisite(s), Corequisite(s)
- Credit Hours, Course Level
- And more...

**Offerings columns include:**
- Subject, Course #, Section #
- CRN, Instructor Name
- Actual Enrollment, Max Enrollment
- Meeting schedules and locations
- And more...

### Output

The preprocessing generates `data/output/courses.json` containing:
- Course metadata
- Enrollment statistics
- Course details with descriptions
- Prerequisites with recursive lookup
- Section-level information

The Express server reads this JSON file to serve the `/api/courses` endpoints.
