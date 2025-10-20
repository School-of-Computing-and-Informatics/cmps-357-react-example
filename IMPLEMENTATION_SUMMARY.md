# Implementation Summary: XLSX Course Data Processing

## Problem Statement Requirements

The task was to create a preprocessing script that processes two XLSX files:
1. **Catalog** - 2024-2025 Academic Catalog course data
2. **Offerings** - Spring 2025 CMPS-only course offerings

### Required Outputs
- Compare max and actual enrollment of each CMPS course
- List prerequisites of each course offered
- Show descriptions of each course
- Show descriptions of all prerequisites

### Deliverables
- Create JSON output
- Add appropriate backend API endpoints

## Implementation

### 1. Preprocessing Script (`scripts/preprocess-courses.js`)

**Features:**
- Reads two XLSX files using the `xlsx` npm package
- Parses catalog data (course descriptions, prerequisites, credit hours)
- Parses offerings data (enrollment, sections, schedules)
- Merges data by course key (e.g., CMPS-160)
- **Recursive prerequisite lookup** - traverses prerequisite chains to include descriptions
- Generates comprehensive JSON output

**Usage:**
```bash
npm run preprocess
```

**Input Files (in `data/input/`):**
- `catalog-2024-2025.xlsx`
- `cmps-offerings-spring-2025.xlsx`

**Output File:**
- `data/output/courses.json`

### 2. Backend API Endpoints (`server.js`)

**Endpoints Added:**

#### GET `/api/courses`
Returns all CMPS courses with enrollment summary:
- Course key, name, credit hours
- Total enrollment (across all sections)
- Max enrollment
- Available seats
- Utilization percentage
- Prerequisites list

#### GET `/api/courses/:courseCode`
Returns complete course details:
- Full description
- **Recursive prerequisite details** with descriptions
- All section information
- Enrollment data
- Schedule and location
- Instructor information

#### GET `/api/courses/stats/enrollment`
Returns aggregate statistics:
- Total courses and sections
- Total enrollment vs capacity
- Average utilization
- Breakdown by utilization level

### 3. JSON Output Structure

```json
{
  "metadata": {
    "generatedAt": "timestamp",
    "catalogFile": "catalog-2024-2025.xlsx",
    "offeringsFile": "cmps-offerings-spring-2025.xlsx",
    "totalCourses": 3,
    "totalSections": 4
  },
  "courses": [
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
  ]
}
```

## Requirements Met

### ✅ Enrollment Comparison
- Shows actual vs max enrollment for each course
- Calculates available seats
- Displays utilization percentage
- Aggregates across multiple sections

**Example:**
- CMPS-160: 83/100 students (83.00% utilization, 17 seats available)
- CMPS-280: 42/45 students (93.33% utilization, 3 seats available)
- CMPS-390: 28/40 students (70.00% utilization, 12 seats available)

### ✅ Prerequisites Listed
Each course includes:
- Direct prerequisites (e.g., CMPS-280 requires CMPS-160)
- Full prerequisite chain (e.g., CMPS-390 → CMPS-280 → CMPS-160 → MATH-140)

### ✅ Course Descriptions
- Full description from academic catalog for each course
- Example: "Study of data structures including arrays, linked lists, stacks, queues, trees, and graphs. Algorithm analysis and implementation."

### ✅ Prerequisite Descriptions (Recursive)
The most powerful feature - automatically includes descriptions of:
- Direct prerequisites
- Prerequisites of prerequisites
- Complete chain up to courses with no prerequisites

**Example:** When querying CMPS-390:
1. Shows CMPS-390 description
2. Shows CMPS-280 description (prerequisite)
3. Shows CMPS-160 description (prerequisite of CMPS-280)
4. Shows MATH-140 description (prerequisite of CMPS-160)

### ✅ JSON Output
- Well-structured, hierarchical JSON format
- Includes all required data
- Easy to parse and use in frontend

### ✅ API Endpoints
Three RESTful endpoints:
- List all courses
- Get specific course details
- Get enrollment statistics

## Technical Details

### Dependencies Added
```json
{
  "xlsx": "^0.18.5"
}
```

### Scripts Added
```json
{
  "preprocess": "node scripts/preprocess-courses.js"
}
```

### Files Created
- `scripts/preprocess-courses.js` - Main preprocessing logic
- `data/README.md` - Data format documentation
- `data/output/courses.json` - Generated output (sample included)
- `PREPROCESSING_GUIDE.md` - User guide
- `IMPLEMENTATION_SUMMARY.md` - This file

### Files Modified
- `server.js` - Added course API endpoints
- `package.json` - Added preprocess script and xlsx dependency
- `package-lock.json` - Updated with xlsx dependencies
- `.gitignore` - Excludes input XLSX files
- `SERVER_README.md` - Updated API documentation

## Testing

All functionality has been tested:
- ✅ XLSX file reading
- ✅ Data parsing and merging
- ✅ Recursive prerequisite lookup
- ✅ JSON generation
- ✅ API endpoint responses
- ✅ Error handling (404 for non-existent courses)
- ✅ Lint checks pass
- ✅ Production build successful

## Usage Example

```bash
# 1. Add XLSX files to data/input/
cp path/to/catalog-2024-2025.xlsx data/input/
cp path/to/cmps-offerings-spring-2025.xlsx data/input/

# 2. Run preprocessing
npm run preprocess

# 3. Start server
npm run server

# 4. Query API
curl http://localhost:3001/api/courses
curl http://localhost:3001/api/courses/CMPS-280
curl http://localhost:3001/api/courses/stats/enrollment
```

## Future Enhancements

Potential improvements:
1. Frontend UI to display course data
2. Visual prerequisite tree diagram
3. Enrollment trend charts
4. Course search and filtering
5. Export to CSV/PDF reports
6. Real-time enrollment updates
7. Email notifications for course availability

## Conclusion

The implementation fully satisfies all requirements from the problem statement:
- ✅ Preprocessing script created
- ✅ Two XLSX files processed
- ✅ Enrollment comparison included
- ✅ Prerequisites listed
- ✅ Course descriptions included
- ✅ Prerequisite descriptions included (with recursive lookup)
- ✅ JSON output generated
- ✅ Backend API endpoints added

The solution is production-ready, well-documented, and extensible for future enhancements.
