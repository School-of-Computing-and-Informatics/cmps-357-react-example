# Course Data Processing Guide

This guide explains how to use the XLSX preprocessing script and course API endpoints to analyze CMPS course enrollment and prerequisites.

## Quick Start

### 1. Prepare Your Data Files

Place two XLSX files in the `data/input/` directory:
- `catalog-2024-2025.xlsx` - Academic catalog with course descriptions and prerequisites
- `cmps-offerings-spring-2025.xlsx` - Spring 2025 CMPS course offerings with enrollment data

See `data/README.md` for the expected column format.

### 2. Run the Preprocessing Script

```bash
npm run preprocess
```

This will:
- Read both XLSX files
- Parse and merge course data
- Resolve prerequisites recursively
- Generate `data/output/courses.json`

Expected output:
```
Starting course data preprocessing...
Reading catalog data...
Loaded 4 catalog entries
Reading course offerings data...
Loaded 4 course offerings
Processing catalog...
Processed 4 unique courses from catalog
Processing offerings...
Processed 3 unique courses from offerings
Merging data...
Generated 3 course records
Writing output to .../data/output/courses.json...
Preprocessing complete!

=== Summary ===
Total Courses: 3
Total Sections: 4
Total Enrollment: 153
Total Capacity: 185
Overall Utilization: 82.70%
```

### 3. Start the Server

```bash
npm run server
# or
npm start  # starts both server and frontend
```

### 4. Access the API

#### Get All Courses
```bash
curl http://localhost:3001/api/courses
```

Response includes:
- Metadata (generation time, file names, totals)
- Array of courses with enrollment summary
- Prerequisites list for each course

#### Get Specific Course with Prerequisites
```bash
curl http://localhost:3001/api/courses/CMPS-280
```

Response includes:
- Complete course information
- Full description
- **Recursive prerequisite details** - shows prerequisites of prerequisites with descriptions
- All section details (instructor, schedule, enrollment)

#### Get Enrollment Statistics
```bash
curl http://localhost:3001/api/courses/stats/enrollment
```

Response includes:
- Total courses and sections
- Total enrollment vs capacity
- Average utilization percentage
- Breakdown by utilization level (high/medium/low)

## Features Implemented

### ✅ Enrollment Comparison
- Max enrollment vs actual enrollment for each course
- Available seats calculation
- Enrollment percentage
- Aggregated across all sections

### ✅ Prerequisites Listing
- Direct prerequisites for each course offered
- Prerequisite codes (e.g., CMPS-160, MATH-140)

### ✅ Course Descriptions
- Full description from academic catalog
- Description for each course offered
- **Recursive prerequisite descriptions** - includes descriptions of all prerequisites and their prerequisites

### ✅ Comprehensive Data Structure
The JSON output includes:
```json
{
  "courseKey": "CMPS-280",
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

## Data Flow

```
XLSX Files → Preprocessing Script → JSON Output → Express Server → API Endpoints
    ↓                  ↓                  ↓              ↓              ↓
 Raw data     Parse & merge        Structured    Load & serve    Frontend
               columns              course data      JSON          integration
```

## File Structure

```
cmps-357-react-example/
├── data/
│   ├── input/                    # XLSX files (not in git)
│   │   ├── catalog-2024-2025.xlsx
│   │   └── cmps-offerings-spring-2025.xlsx
│   ├── output/                   # Generated JSON (in git)
│   │   └── courses.json
│   └── README.md                 # Data format documentation
├── scripts/
│   └── preprocess-courses.js     # XLSX processing script
├── server.js                     # Express server with course endpoints
└── PREPROCESSING_GUIDE.md        # This file
```

## API Response Examples

### Example 1: Course with Prerequisites Chain

Request:
```bash
curl http://localhost:3001/api/courses/CMPS-390
```

Shows that CMPS-390 requires CMPS-280, which requires CMPS-160, which requires MATH-140 - with descriptions for all courses in the chain.

### Example 2: Enrollment Statistics

Request:
```bash
curl http://localhost:3001/api/courses/stats/enrollment
```

Response:
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

## Troubleshooting

### Error: "Catalog file not found"
- Ensure XLSX files are in `data/input/` directory
- Check filenames match exactly:
  - `catalog-2024-2025.xlsx`
  - `cmps-offerings-spring-2025.xlsx`

### Error: "Course not found in catalog"
- The offerings file contains courses not in the catalog
- Prerequisite lookup will show "Not found in catalog" for missing courses

### Empty API Response
- Run `npm run preprocess` first
- Check `data/output/courses.json` exists and contains data
- Restart the server after preprocessing

## Next Steps

After successfully preprocessing the data and testing the API:

1. **Frontend Integration**: Create a React component to display course data
2. **Visualization**: Add charts showing enrollment utilization
3. **Search/Filter**: Implement course search and filtering by prerequisites
4. **Export**: Add CSV/PDF export functionality for reports

## Additional Resources

- `data/README.md` - Detailed XLSX column specifications
- `SERVER_README.md` - Complete API documentation
- `scripts/preprocess-courses.js` - Source code with inline comments
